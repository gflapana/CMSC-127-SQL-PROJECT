import pool from "../config/connectDB"
import express from "express";

const getMembers = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    try {
        let query = "SELECT first_name, IFNULL(middle_name,'') middle_name, last_name, sex";
        const conditions: string[] = ['organization_id = ?'];
        const params: (string | number)[] = [];
        let order: string | null = null;
        let group: string | null = null;

        if (req.query.id && typeof req.query.id == 'string') {
            params.push(req.query.id);
        }

        if (req.query.role && typeof req.query.role == 'string') {
            query += ", role";
            conditions.push('role = ?');
            params.push(req.query.role);
        }

        if (req.query.degree_program && typeof req.query.degree_program == 'string') {
            query += ", degree_program";
            conditions.push('degree_program = ?');
            params.push(req.query.degree_program);
        }
        if (req.query.committee && typeof req.query.committee == 'string') {
            query += ", committee";
            conditions.push('committee = ?');
            params.push(req.query.committee);
        }
        if (req.query.committee_role && typeof req.query.committee_role == 'string') {
            query += ", committee_role";
            conditions.push('committee_role = ?');
            params.push(req.query.committee_role);
        }
        if (req.query.academic_year && typeof req.query.academic_year == 'string') {
            group = " GROUP BY member_id HAVING min(academic_year) = ?";
            query += ", academic_year";
            params.push(req.query.academic_year);
        }
        if (req.query.order && typeof req.query.order == 'string') {
            order = " ORDER BY ?";
            params.push(req.query.order)
        }

        query += " from member natural join organization_has_member WHERE " + conditions.join(' AND ');

        if (group) {
            query += group;
        }

        if (order) {
            query += order;
        }

        console.log(params);

        const conn = await pool.getConnection();
        try {
            const members = await conn.query(query, params);
            res.json({ members });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        }

    } catch (e) {
        next(() => console.error(`Error: ${e}`))
    }
};

const getUnpaidMembers = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    try {
        let query = "SELECT distinct first_name, IFNULL(middle_name,'') middle_name, last_name, sex, degree_program, batch from member natural join fee";
        const conditions: string[] = ['organization_id = ?'];
        const params: (string | number)[] = [];
        let order: string | null = null;

        if (req.query.id && typeof req.query.id == 'string') {
            params.push(req.query.id);
        }

        if (req.query.academic_year && typeof req.query.academic_year == 'string') {
            conditions.push('academic_year = ?');
            params.push(req.query.academic_year);
        }

        if (req.query.semester && typeof req.query.semester == 'string') {
            conditions.push('semester = ?');
            params.push(req.query.semester);
        }

        if (req.query.order && typeof req.query.order == 'string') {
            order = " ORDER BY ?";
            params.push(req.query.order);
        }

        query += " WHERE payment_status = 'Unpaid' AND " + conditions.join(' AND ');


        if (order) {
            query += order;
        }

        console.log(params);

        const conn = await pool.getConnection();
        try {
            const members = await conn.query(query, params);
            res.json({ members });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        }

    } catch (e) {
        next(() => console.error(`Error: ${e}`))
    }
};

export { getMembers, getUnpaidMembers };