const db = require("../config/db");
const statsCollection = db.collection("stats");

exports.getStats = async (req, res) => {
  try {
    const statsDoc = await statsCollection.doc("overall").get();
    const stats = statsDoc.exists ? statsDoc.data() : initializeStats();
    res.json({ status: true, data: stats });
  } catch (error) {
    console.error("Error fetching stats:", error);
    res.status(500).json({ status: false, message: "Error fetching stats" });
  }
};

function initializeStats() {
  return {
    totalStudents: { total: 0, male: 0, female: 0 },
    sportParticipation: [
      { category: "Badminton_Singles-M", revenue: 0, teams: 0 },
      { category: "Badminton_Singles-W", revenue: 0, teams: 0 },
      { category: "Badminton_Doubles-M", revenue: 0, teams: 0 },
      { category: "Badminton_Doubles-W", revenue: 0, teams: 0 },
      { category: "Basketball-M", revenue: 0, teams: 0 },
      { category: "Basketball-W", revenue: 0, teams: 0 },
      { category: "Chess_Singles-M", revenue: 0, teams: 0 },
      { category: "Cricket-M", revenue: 0, teams: 0 },
      { category: "Football-M", revenue: 0, teams: 0 },
      { category: "Kabaddi-M", revenue: 0, teams: 0 },
      { category: "Kabaddi-W", revenue: 0, teams: 0 },
      { category: "Table_Tennis_singles-M", revenue: 0, teams: 0 },
      { category: "Table_Tennis_doubles-M", revenue: 0, teams: 0 },
      { category: "Throwball-W", revenue: 0, teams: 0 },
      { category: "Volleyball-M", revenue: 0, teams: 0 },
      { category: "Volleyball-W", revenue: 0, teams: 0 },
    ],
    collegeParticipation: {},
    totalRevenue: 0,
    accommodation: {
      total: 0,
      male: 0,
      female: 0,
    },
    mealRequirements: {
      breakfast: 0,
      lunch: 0,
      dinner: 0,
    },
  };
}

function validateData(data, type) {
  if (type === "sports") {
    if (!data.category || typeof data.category !== 'string' || data.category.trim() === '') {
      throw new Error('Invalid or missing category');
    }
    if (!Array.isArray(data.mainplayers) || data.mainplayers.length === 0) {
      throw new Error('Invalid or missing main players');
    }
    if (!data.amount || typeof data.amount !== 'number' || data.amount <= 0) {
      throw new Error('Invalid or missing amount');
    }
  } else if (type === "accommodation") {
    if (!data.gender || (data.gender !== 'male' && data.gender !== 'female')) {
      throw new Error('Invalid or missing gender');
    }
    if (!data.amount || typeof data.amount !== 'number' || data.amount <= 0) {
      throw new Error('Invalid or missing amount');
    }
  }
}

exports.updateStats = async (registrationData, type) => {
  const statsRef = statsCollection.doc("overall");
  const maxRetries = 3;
  let retries = 0;

  while (retries < maxRetries) {
    try {
      await db.runTransaction(async (transaction) => {
        const statsDoc = await transaction.get(statsRef);
        let stats = statsDoc.exists ? statsDoc.data() : initializeStats();

        validateData(registrationData, type);

        if (type === "sports") {
          updateSportsStats(stats, registrationData);
        } else if (type === "accommodation") {
          updateAccommodationStats(stats, registrationData);
        }

        const cleanedStats = removeEmptyStringFields(stats);
        transaction.set(statsRef, cleanedStats);
      });
      
      console.log('Stats updated successfully');
      return;
    } catch (error) {
      console.error(`Error updating stats (attempt ${retries + 1}):`, error);
      retries++;
      if (retries >= maxRetries) {
        throw new Error(`Failed to update stats after ${maxRetries} attempts`);
      }
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
};

function updateSportsStats(stats, data) {
  const totalPlayers = data.mainplayers.length + (data.substitutes ? data.substitutes.length : 0);
  stats.totalStudents.total += totalPlayers;

  // data.mainplayers.forEach((player) => {
  //   if (player.gender === 'male' || player.gender === 'female') {
  //     stats.totalStudents[player.gender]++;
  //   }
  // });
  // if (data.substitutes) {
  //   data.substitutes.forEach((player) => {
  //     if (player.gender === 'male' || player.gender === 'female') {
  //       stats.totalStudents[player.gender]++;
  //     }
  //   });
  // }
  
  const sportIndex = stats.sportParticipation.findIndex(sport => sport.category === data.category);
  if (sportIndex !== -1) {
    let sport = stats.sportParticipation[sportIndex];
    console.log(sport)
    sport.teams++;
    sport.revenue += data.amount;
    console.log(sport.category[sport.category.length - 1])
    if(sport.category[sport.category.length - 1] === "M") {
      stats.totalStudents["male"] += totalPlayers;
    }
    else {
      stats.totalStudents["female"] += totalPlayers;
    }
  } else {
    console.warn(`Sport category ${data.category} not found in sportParticipation`);
    stats.sportParticipation.push({category: data.category, teams: 1, revenue: data.amount});
  }

  stats.totalRevenue += data.amount;
  stats.mealRequirements.lunch += totalPlayers;

  // Update college participation
  if (data.collegeName) {
    stats.collegeParticipation[data.collegeName] = (stats.collegeParticipation[data.collegeName] || 0) + 1;
  }
}

function updateAccommodationStats(stats, data) {
  stats.accommodation.total++;
  if (data.gender === 'male' || data.gender === 'female') {
    stats.accommodation[data.gender]++;
  }
  stats.mealRequirements.breakfast++;
  stats.mealRequirements.dinner++;
  stats.totalRevenue += data.amount;
}

function removeEmptyStringFields(obj) {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }
  
  if (Array.isArray(obj)) {
    return obj.map(removeEmptyStringFields);
  }
  
  return Object.fromEntries(
    Object.entries(obj)
      .filter(([_, v]) => v !== '')
      .map(([k, v]) => [k, removeEmptyStringFields(v)])
  );
}