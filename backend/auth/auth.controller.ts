import express from "express";
import pool from "../config/connectDB";

const signIn = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    try {
        let query;
        let params: string[] = []
        if (req.body.type == 'member') {
            query = "SELECT member_id, first_name, IFNULL(middle_name,'') middle_name, last_name, sex, degree_program, batch from member WHERE member_username = ? AND member_password = SHA2(?,0)";
        } else if (req.body.type == "organization") {
            query = "SELECT organization_id, organization_name, organization_type, date_established, years_active from organization WHERE organization_username = ? AND member_password = SHA2(?,0)";
        }

        if (req.body.username && typeof req.body.username === 'string') {
            params.push(req.body.username);
        }
        if (req.body.password && typeof req.body.password === 'string') {
            params.push(req.body.password);
        }

        const conn = await pool.getConnection();
        try {
            const userQuery = await conn.query(query, params);
            const user = userQuery[0];
            res.json({ user });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        }

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export { signIn };