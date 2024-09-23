const db = require("../config/db");
async function Category(req, res) {
  try {
    const category = req.params.category;
    const teamsSnapshot = await db.collection(category).get();
    const teams = [];
    teamsSnapshot.forEach((doc) => {
      teams.push({ id: doc.id, ...doc.data() });
    });
    console.log({teams});
    res.json({ teams });
  } catch (error) {
    console.error("Error fetching teams:", error);
    res.status(500).json({ error: "Failed to fetch teams" });
  }
}

exports.Category = Category;