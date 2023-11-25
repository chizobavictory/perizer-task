import { Request, Response } from "express";
import { users, User, Team, teams } from "../data/data";

export const getAllUsers = (req: Request, res: Response): void => {
  console.log("Request received for getAllUsers");
  try {
    res.status(200).json(users);
  } catch (error) {
    console.error("Error getting users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const searchUsers = (req: Request, res: Response): void => {
  try {
    const { name, email, gender, role, team } = req.query;

    // Function to check if a user matches the search criteria
    const matchesSearchCriteria = (user: User) => {
      const matchesName = !name || user.name.toLowerCase().includes(name.toString().toLowerCase());
      const matchesEmail = !email || user.email.toLowerCase().includes(email.toString().toLowerCase());
      const matchesGender = !gender || user.gender.toLowerCase() === gender.toString().toLowerCase();
      const matchesRole = !role || user.role.toLowerCase() === role.toString().toLowerCase();
      const matchesTeam = !team || user.team === parseInt(team.toString());

      return matchesName && matchesEmail && matchesGender && matchesRole && matchesTeam;
    };

    // Filtering users based on the search criteria
    let filteredUsers = users.filter(matchesSearchCriteria);

    // Adding team names to the result
    filteredUsers = filteredUsers.map((user) => {
      const team = teams.find((t: Team) => t.id === user.team);
      const teamName = team ? team.name : "Unknown Team";
      return { ...user, teamName };
    });

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.error("Error searching users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
