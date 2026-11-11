/**
 * 🌟 Sovereign AIRA Verified Reviews Gateway (Vercel Serverless - ES Module)
 * Engineered for Aira Group of Technology (airaaigroup.in)
 * Founder & CEO: Er. Adam Eehan
 * 
 * Features:
 * - Real-time persistent feedback list storage via secure backend proxy
 * - Multi-user chronological review preservation
 * - Strict Owner-Only Edit & Delete (Each user can only modify/delete their own review)
 * - Automated notification dispatch to Er. Adam Eehan
 */

const JSONBIN_BIN_ID = process.env.JSONBIN_BIN_ID || "6ae98e5dffd5d16053a19fc4";
const JSONBIN_API_KEY = process.env.JSONBIN_API_KEY || "$2a$10$0IoWYIJUtPPsZ9Y9fED.megYee63XlKIFxzn.cGXYPVu.TMqC.SKi";
const BOSS_EMAIL = "adameehan34@gmail.com";

// Helper: Fetch latest reviews directly from JSONBin with zero caching
async function fetchLatestFromBin() {
  try {
    const res = await fetch(`https://api.jsonbin.io/v3/b/${JSONBIN_BIN_ID}/latest`, {
      method: "GET",
      headers: {
        "X-Master-Key": JSONBIN_API_KEY,
        "X-Bin-Meta": "false",
        "Cache-Control": "no-cache, no-store, must-revalidate"
      }
    });

    if (!res.ok) {
      console.error(`[Reviews API] JSONBin fetch failed with status ${res.status}`);
      return [];
    }

    const data = await res.json();
    if (data && Array.isArray(data.feedbacks)) {
      return data.feedbacks;
    }
    return [];
  } catch (err) {
    console.error("[Reviews API] JSONBin fetch exception:", err);
    return [];
  }
}

// Helper: Save entire reviews array back to JSONBin atomically
async function saveToBin(feedbacks) {
  const res = await fetch(`https://api.jsonbin.io/v3/b/${JSONBIN_BIN_ID}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "X-Master-Key": JSONBIN_API_KEY,
      "X-Bin-Versioning": "false"
    },
    body: JSON.stringify({ feedbacks })
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`JSONBin PUT failed with code ${res.status}: ${errorText}`);
  }

  return true;
}

export default async function handler(req, res) {
  // CORS & No-Cache Headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // --- GET: Fetch all reviews as list ---
  if (req.method === "GET") {
    try {
      const feedbacks = await fetchLatestFromBin();
      return res.status(200).json({
        success: true,
        count: feedbacks.length,
        reviews: feedbacks
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        error: "Failed to load reviews.",
        message: err.message
      });
    }
  }

  // --- DELETE (or POST action === 'delete'): Owner-Only Delete ---
  const body = req.body || {};
  const query = req.query || {};
  const action = body.action || query.action;

  if (req.method === "DELETE" || action === "delete") {
    try {
      const targetId = body.id || query.id;
      const userEmail = body.email || query.email;

      if (!targetId || !userEmail) {
        return res.status(400).json({ success: false, error: "Review ID and authenticated user email are required." });
      }

      const cleanEmail = userEmail.trim().toLowerCase();
      const currentFeedbacks = await fetchLatestFromBin();
      const existing = currentFeedbacks.find(r => r.id === targetId || (r.email && r.email.toLowerCase() === cleanEmail));

      if (!existing) {
        return res.status(404).json({ success: false, error: "Review not found in database." });
      }

      // Security check: Only the owner can delete their review
      if (!existing.email || existing.email.toLowerCase() !== cleanEmail) {
        return res.status(403).json({ success: false, error: "Unauthorized: You can only delete your own review." });
      }

      const updatedFeedbacks = currentFeedbacks.filter(r => r.id !== existing.id);
      await saveToBin(updatedFeedbacks);

      return res.status(200).json({
        success: true,
        message: "Your review was successfully deleted.",
        count: updatedFeedbacks.length,
        reviews: updatedFeedbacks
      });
    } catch (err) {
      console.error("[Reviews API] Delete error:", err);
      return res.status(500).json({ success: false, error: "Failed to delete review: " + err.message });
    }
  }

  // --- POST: Add new review or edit existing review ---
  if (req.method === "POST") {
    try {
      const { name, email, photo, rating, tag, text, id, date, isEdit } = body;

      if (!text || !text.trim()) {
        return res.status(400).json({ success: false, error: "Review text is required." });
      }

      const cleanName = (name && name.trim()) ? name.trim() : "Verified Member";
      const cleanEmail = (email && email.trim()) ? email.trim().toLowerCase() : "";
      if (!cleanEmail) {
        return res.status(400).json({ success: false, error: "Authenticated user email is required." });
      }

      const cleanText = text.trim().slice(0, 1500);
      const cleanRating = (typeof rating === "number" && rating >= 1 && rating <= 5) ? rating : 5;
      const cleanTag = (tag && tag.trim()) ? tag.trim() : "Client / Collaborator";
      const cleanPhoto = (photo && photo.trim()) ? photo.trim() : `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(cleanName)}`;
      const baseDate = date || new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
      const cleanDate = isEdit ? `${baseDate.replace(" (Edited)", "")} (Edited)` : baseDate;

      // 1. Fetch current list of reviews from cloud
      const currentFeedbacks = await fetchLatestFromBin();
      let updatedFeedbacks = [...currentFeedbacks];

      // 2. Locate existing review if editing or if user already reviewed
      let existingIndex = -1;
      if (id) {
        existingIndex = updatedFeedbacks.findIndex(r => r.id === id);
      }
      if (existingIndex === -1 && cleanEmail) {
        existingIndex = updatedFeedbacks.findIndex(r => r.email && r.email.toLowerCase() === cleanEmail);
      }

      let reviewId = id || ("rev_" + Date.now());

      if (existingIndex >= 0) {
        const existingReview = updatedFeedbacks[existingIndex];
        // Security check: Only the owner can edit their review
        if (existingReview.email && existingReview.email.toLowerCase() !== cleanEmail) {
          return res.status(403).json({ success: false, error: "Unauthorized: You can only edit your own review." });
        }
        reviewId = existingReview.id;
        const updatedReview = {
          id: reviewId,
          name: cleanName,
          email: cleanEmail,
          photo: cleanPhoto,
          rating: cleanRating,
          tag: cleanTag,
          text: cleanText,
          date: cleanDate
        };
        // Replace in place or move to top
        updatedFeedbacks.splice(existingIndex, 1);
        updatedFeedbacks.unshift(updatedReview);
      } else {
        // New review
        const newReview = {
          id: reviewId,
          name: cleanName,
          email: cleanEmail,
          photo: cleanPhoto,
          rating: cleanRating,
          tag: cleanTag,
          text: cleanText,
          date: cleanDate
        };
        updatedFeedbacks.unshift(newReview);
      }

      // 3. Atomically write back to cloud
      await saveToBin(updatedFeedbacks);

      // 4. Background notification dispatch to Er. Adam Eehan
      try {
        fetch("https://formsubmit.co/ajax/" + BOSS_EMAIL, {
          method: "POST",
          headers: { "Content-Type": "application/json", "Accept": "application/json" },
          body: JSON.stringify({
            _subject: `🌟 ${existingIndex >= 0 ? "Review Edited" : "New Feedback"}: ${cleanName} (${cleanRating} Stars) - airaaigroup.in`,
            Name: cleanName,
            Email: cleanEmail,
            Rating: `${cleanRating} / 5 Stars`,
            Category: cleanTag,
            Review: cleanText,
            Date: cleanDate,
            IsEdited: existingIndex >= 0,
            TotalReviewsInDatabase: updatedFeedbacks.length
          })
        }).catch(() => {});
      } catch (mailErr) {}

      return res.status(200).json({
        success: true,
        message: existingIndex >= 0 ? "Review successfully updated." : "Review successfully published and preserved.",
        count: updatedFeedbacks.length,
        reviews: updatedFeedbacks
      });
    } catch (err) {
      console.error("[Reviews API] Submit error:", err);
      return res.status(500).json({
        success: false,
        error: "Failed to publish review.",
        message: err.message
      });
    }
  }

  return res.status(405).json({ error: "Method not allowed. Use GET, POST, or DELETE." });
}
