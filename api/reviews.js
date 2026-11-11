/**
 * 🌟 Sovereign AIRA Verified Reviews Gateway (Vercel Serverless - ES Module)
 * Engineered for Aira Group of Technology (airaaigroup.in)
 * Founder & CEO: Er. Adam Eehan
 * 
 * Features:
 * - Real-time persistent feedback list storage via secure backend proxy
 * - Eliminates client-side race conditions, CORS blocks, and overwrites
 * - Multi-user chronological review preservation (new reviews unshift, existing updates)
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
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
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

  // --- POST: Add new review or update existing review without deleting others ---
  if (req.method === "POST") {
    try {
      const { name, email, photo, rating, tag, text, id, date } = req.body || {};

      if (!text || !text.trim()) {
        return res.status(400).json({ success: false, error: "Review text is required." });
      }

      const cleanName = (name && name.trim()) ? name.trim() : "Verified Member";
      const cleanEmail = (email && email.trim()) ? email.trim().toLowerCase() : "";
      const cleanText = text.trim().slice(0, 1500);
      const cleanRating = (typeof rating === "number" && rating >= 1 && rating <= 5) ? rating : 5;
      const cleanTag = (tag && tag.trim()) ? tag.trim() : "Client / Collaborator";
      const cleanPhoto = (photo && photo.trim()) ? photo.trim() : `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(cleanName)}`;
      const cleanDate = date || new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
      const reviewId = id || ("rev_" + Date.now());

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

      // 1. Fetch current list of reviews from cloud
      const currentFeedbacks = await fetchLatestFromBin();

      // 2. Check if this user (by email) already submitted a review
      let updatedFeedbacks = [...currentFeedbacks];
      let existingIndex = -1;
      
      if (cleanEmail) {
        existingIndex = updatedFeedbacks.findIndex(r => r.email && r.email.toLowerCase() === cleanEmail);
      }

      if (existingIndex >= 0) {
        // User is updating their existing review -> Move updated review to top
        updatedFeedbacks.splice(existingIndex, 1);
        updatedFeedbacks.unshift(newReview);
      } else {
        // New user -> Prepend to the list so older reviews are preserved!
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
            _subject: `🌟 New Real Feedback: ${cleanName} (${cleanRating} Stars) - airaaigroup.in`,
            Name: cleanName,
            Email: cleanEmail,
            Rating: `${cleanRating} / 5 Stars`,
            Category: cleanTag,
            Review: cleanText,
            Date: cleanDate,
            TotalReviewsInDatabase: updatedFeedbacks.length
          })
        }).catch(() => {});
      } catch (mailErr) {
        // ignore background mail errors
      }

      return res.status(200).json({
        success: true,
        message: "Review successfully published and preserved in cloud database.",
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

  return res.status(405).json({ error: "Method not allowed. Use GET or POST." });
}
