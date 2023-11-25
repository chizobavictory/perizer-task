"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = void 0;
const data_1 = require("../data/data");
const getUsers = (req, res) => {
    try {
        const { name, email, gender, role, team } = req.query;
        if (name || email || gender || role || team) {
            // Function to check if a user matches the search criteria
            const matchesSearchCriteria = (user) => {
                const matchesName = !name || user.name.toLowerCase().includes(name.toString().toLowerCase());
                const matchesEmail = !email || user.email.toLowerCase().includes(email.toString().toLowerCase());
                const matchesGender = !gender || user.gender.toLowerCase() === gender.toString().toLowerCase();
                const matchesRole = !role || user.role.toLowerCase() === role.toString().toLowerCase();
                const matchesTeam = !team || user.team === parseInt(team.toString());
                return matchesName && matchesEmail && matchesGender && matchesRole && matchesTeam;
            };
            // Filtering users based on the search criteria
            let filteredUsers = data_1.users.filter(matchesSearchCriteria);
            // Adding team names to the result
            filteredUsers = filteredUsers.map((user) => {
                const team = data_1.teams.find((t) => t.id === user.team);
                const teamName = team ? team.name : "Unknown Team";
                return Object.assign(Object.assign({}, user), { teamName });
            });
            res.status(200).json(filteredUsers);
        }
        else {
            res.status(200).json(data_1.users);
        }
    }
    catch (error) {
        console.error("Error getting users:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.getUsers = getUsers;
