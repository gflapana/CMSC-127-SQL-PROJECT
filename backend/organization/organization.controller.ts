import pool from "../config/connectDB"
import express from "express";


// Queries: id (NOT required, you might need it :D ), sex, degree_program, year_joined, committee, committee_role, member_status, academic_year, semester, order (order by), desc (true if desc)
const getMembers = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    try {
        console.log(req.query.distinct);
        let query = `SELECT ${(req.query.distinct) ? "distinct" : ""} member_id, first_name, IFNULL(middle_name,'') middle_name, last_name, sex, batch, degree_program, year_joined, member_status, committee, committee_role, academic_year, semester from member natural join organization_has_member`;
        const conditions: string[] = [];
        const params: (string | number)[] = [];
        let order: string | null = null;

        if (req.query.id && typeof req.query.id == 'string') {
            conditions.push('organization_id =  ?');
            params.push(req.query.id);
        }

        if (req.query.sex && typeof req.query.sex == 'string') {
            conditions.push(`sex like '%${req.query.sex}'`);
        }

        if (req.query.degree_program && typeof req.query.degree_program == 'string') {
            conditions.push(`degree_program like '%${req.query.degree_program}%'`);
        }
        if (req.query.committee && typeof req.query.committee == 'string') {
            conditions.push(`committee like '%${req.query.committee}%'`);
        }

        if (req.query.year_joined && typeof req.query.year_joined == 'string') {
            conditions.push('year_joined = ?');
            params.push(req.query.year_joined);
        }


        if (req.query.member_status && typeof req.query.member_status == 'string') {
            conditions.push(`member_status like '%${req.query.member_status}%'`);
        }

        if (req.query.committee_role && typeof req.query.committee_role == 'string') {
            conditions.push(`committee_role like '%${req.query.committee_role}%'`);
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
            order = ` ORDER BY ${req.query.order}`;
        }

        if (req.query.desc && req.query.desc == 'true') {
            order += " DESC";
        }
        if (conditions.length != 0) {
            query += " WHERE " + conditions.join(' AND ');
        }


        if (order) {
            query += order;
        }

        console.log(query);
        console.log(params);
        const conn = await pool.getConnection();
        try {
            const members = await conn.query(query, params);
            // console.log(members);
            res.json({ members });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        } finally {
            conn.release();
        }

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const findEligibleMembers = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    try {
        const params = [req.query.id];
        const conn = await pool.getConnection();
        try {
            const members = await conn.query("SELECT member_id, first_name, IFNULL(middle_name,'') middle_name, last_name, sex, degree_program, batch, (select distinct year_joined from organization_has_member ohm where organization_id = ? AND ohm.member_id = m.member_id) year_joined from member m", params);
            // console.log(members);
            res.json({ members });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: `Internal Server Error` });
        } finally {
            conn.release();
        }

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


// queries: id (required), academic_year (required), semester(required), order, desc
const getUnpaidMembers = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    try {
        let query = "SELECT distinct member_id, first_name, IFNULL(middle_name,'') middle_name, last_name, sex, degree_program, batch from member natural join fee";
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
            order = ` ORDER BY ${req.query.order}`;
        }

        query += " WHERE payment_status = 'Unpaid' AND " + conditions.join(' AND ');


        if (order) {
            query += order;
        }

        const conn = await pool.getConnection();
        try {
            const members = await conn.query(query, params);
            res.json({ members });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        } finally {
            conn.release();
        }

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


//params: id (required), academic_year(required), order, desc
const getExecutiveMembers = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    try {
        let query = "SELECT distinct member_id, first_name, IFNULL(middle_name,'') middle_name, last_name, sex, degree_program, year_joined, batch, member_status, committee, committee_role, academic_year from member natural join organization_has_member natural join organization WHERE organization_id = ? AND committee='Executive' AND academic_year = ?";
        const params: (string | number)[] = [];
        let order: string | null = null;

        if (req.query.id && typeof req.query.id == 'string') {
            params.push(req.query.id);
        }

        if (req.query.academic_year && typeof req.query.academic_year == 'string') {
            params.push(req.query.academic_year);
        }

        if (req.query.order && typeof req.query.order == 'string') {
            order = ` ORDER BY ${req.query.order}`;
        }


        if (order) {
            query += order;
        }

        const conn = await pool.getConnection();
        try {
            const members = await conn.query(query, params);
            res.json({ members });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        } finally {
            conn.release();
        }

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// params: id (required), committee_role (required)
const getMembersByRole = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    try {
        let query = "SELECT member.member_id,first_name, IFNULL(middle_name,'') middle_name, sex ,degree_program ,batch, committee, committee_role,     status, academic_year , semester, committee_role FROM organization_has_member JOIN member ON organization_has_member.member_id=member.member_id WHERE committee_role=? AND organization_id=? ORDER BY CONCAT(academic_year,semester) desc";
        const params: (string | number)[] = [];

        if (req.query.committee_role && typeof req.query.committee_role == 'string') {
            params.push(req.query.committee_role);
        }

        if (req.query.id && typeof req.query.id == 'string') {
            params.push(req.query.id);
        }

        const conn = await pool.getConnection();
        try {
            const members = await conn.query(query, params);
            res.json({ members });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        } finally {
            conn.release();
        }

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

//Params: id (required), semester (required), academic year (required)
const getLatePayments = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    try {
        let query = ("SELECT ohm.member_id, m.first_name, IFNULL(m.middle_name,'') as middle_name, last_name, f.fee_amount, f.due_date, f.date_paid, f.payment_status, f.semester, f.academic_year FROM organization AS o JOIN organization_has_member AS ohm ON o.organization_id = ohm.organization_id JOIN member AS m ON ohm.member_id = m.member_id JOIN fee AS f ON ohm.member_id = f.member_id WHERE (f.due_date < f.date_paid AND ohm.organization_id = ? AND f.semester = ? AND f.academic_year = ?)");
        const params: (string | number)[] = [];

        if (req.query.id && typeof req.query.id == 'string') {
            params.push(req.query.id);
        }

        if (req.query.semester && typeof req.query.semester == 'string') {
            params.push(req.query.semester);
        }

        if (req.query.academic_year && typeof req.query.academic_year == 'string') {
            params.push(req.query.academic_year);
        }


        const conn = await pool.getConnection();
        try {
            const payments = await conn.query(query, params);
            res.json({ payments });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        } finally {
            conn.release();
        }

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

//params: id(required), semesters (number of semesters, required)
const getPercentage = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    try {
        let query;

        if (req.query.id && typeof req.query.id == 'string' && req.query.semesters && typeof req.query.semesters == 'string')
            query = `SELECT 
    ${parseInt(req.query.semesters)} as past_n_emesters,
    100 * (SELECT COUNT(*) 
     FROM organization_has_member AS ohm 
     JOIN organization AS o ON ohm.organization_id = o.organization_id 
     WHERE ohm.member_status = 'Active' 
       AND o.organization_id = ${parseInt(req.query.id)} 
       AND (
           CASE 
               WHEN semester = '1st Semester' THEN 
                   ((YEAR(CURDATE()) - YEAR(STR_TO_DATE(CONCAT(LEFT(academic_year, 4), '-06-01'), '%Y-%m-%d'))) * 2)
               ELSE 
                   ((YEAR(CURDATE()) - YEAR(STR_TO_DATE(CONCAT(LEFT(academic_year, 4), '-06-01'), '%Y-%m-%d'))) * 2) - 1 
           END
       ) <= ${parseInt(req.query.semesters)} 
    ) / (SELECT COUNT(*) 
     FROM organization_has_member AS ohm 
     JOIN organization AS o ON ohm.organization_id = o.organization_id 
     WHERE o.organization_id = ${parseInt(req.query.id)} 
       AND (
           CASE 
               WHEN semester = '1st Semester' THEN 
                   ((YEAR(CURDATE()) - YEAR(STR_TO_DATE(CONCAT(LEFT(academic_year, 4), '-06-01'), '%Y-%m-%d'))) * 2)
               ELSE 
                   ((YEAR(CURDATE()) - YEAR(STR_TO_DATE(CONCAT(LEFT(academic_year, 4), '-06-01'), '%Y-%m-%d'))) * 2) - 1 
           END
       ) <= ${parseInt(req.query.semesters)}
    ) AS active_count_percentage, 

    100 * (SELECT COUNT(*) 
     FROM organization_has_member AS ohm 
     JOIN organization AS o ON ohm.organization_id = o.organization_id 
     WHERE ohm.member_status = 'Inactive' 
       AND o.organization_id = ${parseInt(req.query.id)} 
       AND (
           CASE 
               WHEN semester = '1st Semester' THEN 
                   ((YEAR(CURDATE()) - YEAR(STR_TO_DATE(CONCAT(LEFT(academic_year, 4), '-06-01'), '%Y-%m-%d'))) * 2)
               ELSE 
                   ((YEAR(CURDATE()) - YEAR(STR_TO_DATE(CONCAT(LEFT(academic_year, 4), '-06-01'), '%Y-%m-%d'))) * 2) - 1 
           END
       ) <= ${parseInt(req.query.semesters)} 
    ) / (SELECT COUNT(*) 
     FROM organization_has_member AS ohm 
     JOIN organization AS o ON ohm.organization_id = o.organization_id 
     WHERE o.organization_id = ${parseInt(req.query.id)} 
       AND (
           CASE 
               WHEN semester = '1st Semester' THEN 
                   ((YEAR(CURDATE()) - YEAR(STR_TO_DATE(CONCAT(LEFT(academic_year,4), '-06-01'), '%Y-%m-%d'))) * 2)
               ELSE 
                   ((YEAR(CURDATE()) - YEAR(STR_TO_DATE(CONCAT(LEFT(academic_year,4), '-06-01'), '%Y-%m-%d'))) * 2) - 1 
           END
       ) <= ${parseInt(req.query.semesters)} 
    ) AS inactive_count_percentage,

    (SELECT COUNT(*) 
     FROM organization_has_member AS ohm 
     JOIN organization AS o ON ohm.organization_id = o.organization_id 
     WHERE o.organization_id = ${parseInt(req.query.id)} 
       AND (
           CASE 
               WHEN semester = '1st Semester' THEN 
                   ((YEAR(CURDATE()) - YEAR(STR_TO_DATE(CONCAT(LEFT(academic_year, 4), '-06-01'), '%Y-%m-%d'))) * 2)
               ELSE 
                   ((YEAR(CURDATE()) - YEAR(STR_TO_DATE(CONCAT(LEFT(academic_year, 4), '-06-01'), '%Y-%m-%d'))) * 2) - 1 
           END
       ) <= ${parseInt(req.query.semesters)} 
    ) AS total_members`;




        const conn = await pool.getConnection();
        try {
            const percentageQuery = await conn.query(query);
            percentageQuery[0].total_members = Number(percentageQuery[0].total_members);
            let percentage = percentageQuery[0];
            res.json({ percentage });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        } finally {
            conn.release();
        }

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

//params: id (required), date(required)
const getAlumni = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    try {
        let query = `SELECT m.member_id, m.first_name, IFNULL(m.middle_name,'') middle_name, last_name, ohm.semester, ohm.academic_year
FROM organization AS o 
JOIN organization_has_member AS ohm  
ON o.organization_id = ohm.organization_id 
JOIN member AS m
ON m.member_id = ohm.member_id
WHERE ohm.member_status = 'alumni' 
  AND o.organization_id = ? `;
        const params: (string | number)[] = [];

        if (req.query.id && typeof req.query.id == 'string') {
            params.push(req.query.id);
        }

        if (req.query.date && typeof req.query.date == 'string') {
            query += `AND (
      (MONTH(?) BETWEEN 8 AND 12 AND (LEFT(ohm.academic_year,4) < YEAR(?) OR  (LEFT(ohm.academic_year,4) = YEAR(?) AND ohm.semester = '1st Semester'))) OR
      (MONTH(?) BETWEEN 1 AND 7 AND RIGHT(ohm.academic_year,4) <= YEAR(?))
  )`;
            params.push(req.query.date);
            params.push(req.query.date);
            params.push(req.query.date);
            params.push(req.query.date);
            params.push(req.query.date);
        }
        const conn = await pool.getConnection();
        try {
            const alumni = await conn.query(query, params);
            res.json({ alumni });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        } finally {
            conn.release();
        }

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getTotalFees = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    try {
        let query = `SELECT 
    SUM(CASE WHEN f.date_paid IS NULL THEN f.fee_amount ELSE 0 END) AS total_unpaid_fees,
    SUM(CASE WHEN f.date_paid IS NOT NULL THEN f.fee_amount ELSE 0 END) AS total_paid_fees
FROM fee AS f
JOIN organization AS o
ON f.organization_id = o.organization_id
WHERE o.organization_id = ? `;

        const params: (string | number)[] = [];

        if (req.query.id && typeof req.query.id == 'string') {
            params.push(req.query.id);

        }

        if (req.query.date && typeof req.query.date == 'string') {
            query += ` AND f.due_date <= ?`;
            params.push(req.query.date);
        }



        const conn = await pool.getConnection();
        try {
            const paymentsQuery = await conn.query(query, params);
            const payments = paymentsQuery[0];
            res.json({ payments });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        } finally {
            conn.release();
        }

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

//params: id(required), semester(required)
const getHighestDebtor = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    try {
        let query = `SELECT m.member_id, m.first_name, IFNULL(m.middle_name,'') middle_name, m.last_name, m.sex, m.degree_program, m.batch, debts.total_debt
FROM (
    SELECT f.member_id, SUM(f.fee_amount) AS total_debt
    FROM fee AS f
    JOIN organization_has_member AS ohm ON f.member_id = ohm.member_id
    WHERE f.date_paid IS NULL 
      AND ohm.organization_id = ?`
        const params: (string | number)[] = [];

        if (req.query.id && typeof req.query.id == 'string') {
            params.push(req.query.id);
        }

        if (req.query.academic_year && typeof req.query.academic_year == 'string') {
            query += ` AND f.academic_year = ? `;
            params.push(req.query.academic_year);

        }

        if (req.query.semester && typeof req.query.semester == 'string') {
            query += ' AND f.semester = ? ';
            params.push(req.query.semester);
        }

        query += ` GROUP BY f.member_id
) AS debts
JOIN member as m on debts.member_id = m.member_id
WHERE total_debt = (SELECT MAX(total_debt) 
                    FROM (
                        SELECT SUM(f.fee_amount) AS total_debt
                        FROM fee AS f
                        JOIN organization_has_member AS ohm ON f.member_id = ohm.member_id
                        WHERE f.date_paid IS NULL 
                          AND ohm.organization_id = ? `;

        if (req.query.id && typeof req.query.id == 'string') {
            params.push(req.query.id);
        }

        if (req.query.academic_year && typeof req.query.academic_year == 'string') {
            query += ` AND f.academic_year = ? `;
            params.push(req.query.academic_year);

        }

        if (req.query.semester && typeof req.query.semester == 'string') {
            query += ' AND f.semester = ? ';
            params.push(req.query.semester);
        }

        query += `GROUP BY f.member_id
                    ) AS max_debts)`

        const conn = await pool.getConnection();
        try {
            const debtor = await conn.query(query, params);
            res.json({ debtor });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        } finally {
            conn.release();
        }

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// literally lahat ng nasa details (except events, NO editing (di naman nagmamake sense just delete and add new))
const editDetails = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    let query = "UPDATE organization SET organization_name = ?, organization_type = ?, date_established = ?, years_active = ? WHERE organization_id = ?";
    let params: string[] = [];
    params.push(req.body.organization_name);
    params.push(req.body.organization_type);
    params.push(req.body.date_established);
    params.push(req.body.years_active);
    params.push(req.body.organization_id);
    console.log(params);
    try {
        const conn = await pool.getConnection();
        try {
            await conn.query(query, params);
            // await conn.commit();
            res.json({ status: "success" });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        } finally {
            conn.release();
        }

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const deleteMember = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {

    try {
        const conn = await pool.getConnection();
        try {
            await conn.query(`DELETE FROM organization_has_member WHERE member_id=${req.body.member_id} AND organization_id = ${req.body.id}`);
            await conn.query(`DELETE FROM fee WHERE member_id=${req.body.member_id} AND id=${req.body.id}`);
            res.json({ status: "success" });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        } finally {
            conn.release();
        }

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const deleteFee = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {

    try {
        const conn = await pool.getConnection();
        try {
            await conn.query(`DELETE FROM fee WHERE member_id=${req.body.member_id} AND organization_id = ${req.body.id} AND semester = ${req.body.semester} AND academic_year = ${req.body.academic_year}`);
            res.json({ status: "success" });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        } finally {
            conn.release();
        }

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }

};
const deleteEvent = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    let query = "DELETE organization_event WHERE organization_id= ? AND event_name= ?";

    let params: string[] = [];
    if (req.body.id && typeof req.body.id == 'number' && req.body.event_name && typeof req.body.event_name == 'string') {
        params.push(req.body.id);
        params.push(req.body.event_name);
    }

    console.log(params);
    try {
        const conn = await pool.getConnection();
        try {
            await conn.query(query, params);
            res.json({ status: "success" });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        } finally {
            conn.release();
        }

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const addEvent = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    let query = "INSERT INTO organization_event(organization_id, event_name) VALUES (?,?)";

    let params: string[] = [];
    if (req.body.id && typeof req.body.id == 'number' && req.body.event_name && typeof req.body.event_name == 'string') {
        params.push(req.body.id);
        params.push(req.body.event_name);
    }

    console.log(params);
    try {
        const conn = await pool.getConnection();
        try {
            await conn.query(query, params);
            res.json({ status: "success" });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        } finally {
            conn.release();
        }

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const findDeletableMembers = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    try {
        const params = [req.query.id, req.query.id];
        const conn = await pool.getConnection();
        try {
            const members = await conn.query("SELECT distinct member_id, first_name, IFNULL(middle_name,'') middle_name, last_name, sex, degree_program, batch, (select distinct year_joined from organization_has_member ohm where organization_id = ? AND ohm.member_id = m.member_id) year_joined from member m where member_id in (select member_id from organization_has_member where organization_id = ?)", params);
            // console.log(members);
            res.json({ members });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: `Internal Server Error` });
        } finally {
            conn.release();
        }

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
const addFee = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    let query = "INSERT INTO fee(fee_amount, due_date, date_paid, payment_status, semester, academic_year, organization_id, member_id) VALUES (?,?,?,?,?,?,?,?)";

    let params: (string | number | null)[] = [];

    params.push(req.body.fee_amount);
    params.push(req.body.due_date);
    params.push(req.body.date_paid);

    if (!req.body.date_paid) {
        params.push("Unpaid");
    } else if (new Date(req.body.date_paid) > new Date(req.body.due_date)) {
        params.push("Paid Late");
    } else {
        params.push("Paid");
    }

    params.push(req.body.semester);
    params.push(req.body.academic_year);
    params.push(req.body.id);
    params.push(req.body.member_id);

    console.log(params);
    try {
        const conn = await pool.getConnection();
        try {
            await conn.query(query, params);
            res.json({ status: "success" });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        } finally {
            conn.release();
        }

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const updateFee = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    let query = "UPDATE fee SET fee_amount = ?, due_date = ?, date_paid = ?, payment_status = ? WHERE semester = ? AND academic_year = ? AND organizaion_id = ? AND member_id = ?";

    let params: (string | number | null)[] = [];

    params.push(req.body.fee_amount);
    params.push(req.body.due_date);
    params.push(req.body.date_paid);

    if (!req.body.date_paid) {
        params.push("Unpaid");
    } else if (new Date(req.body.date_paid) > new Date(req.body.due_date)) {
        params.push("Paid Late");
    } else {
        params.push("Paid");
    }

    params.push(req.body.semester);
    params.push(req.body.academic_year);
    params.push(req.body.id);
    params.push(req.body.member_id);

    console.log(params);
    try {
        const conn = await pool.getConnection();
        try {
            await conn.query(query, params);
            res.json({ status: "success" });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        } finally {
            conn.release();
        }

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const addMemberToOrganization = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    let query = "INSERT INTO organization_has_member(organization_id, member_id,year_joined, committee, committee_role, member_status, academic_year, semester) VALUES (?,?,?,?,?,?,?,?)";
    let params: (string | number | null)[] = [];

    params.push(req.body.id);
    params.push(req.body.member_id);
    params.push(req.body.year_joined);
    params.push(req.body.committee);
    params.push(req.body.committee_role);
    params.push(req.body.member_status);
    params.push(req.body.academic_year);
    params.push(req.body.semester);

    console.log(params);
    try {
        const conn = await pool.getConnection();
        try {
            await conn.query(query, params);
            res.json({ status: "success" });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        } finally {
            conn.release();
        }

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const updateMemberToOrganization = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    let query = "UPDATE organization_has_member SET year_joined = ?, committee = ?, committee_role = ?, member_status = ? WHERE organization_id = ? AND member_id = ? AND academic_year = ? AND semester = ?";
    let params: (string | number | null)[] = [];

    params.push(req.body.year_joined);
    params.push(req.body.committee);
    params.push(req.body.committee_role);
    params.push(req.body.member_status);
    params.push(req.body.id);
    params.push(req.body.member_id);
    params.push(req.body.academic_year);
    params.push(req.body.semester);

    console.log(params);
    try {
        const conn = await pool.getConnection();
        try {
            await conn.query(query, params);
            res.json({ status: "success" });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        } finally {
            conn.release();
        }

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getFees = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    try {
        let query = "SELECT fee_id, member_id, organization_name, first_name, IFNULL(middle_name,'') middle_name, last_name, fee_amount, due_date, date_paid, payment_status, semester, academic_year from member natural join fee natural join organization";
        const conditions: string[] = [];
        const params: (string | number | null)[] = [];
        let order: string | null = null;

        if (req.query.id && typeof req.query.id == 'string') {
            conditions.push('organization_id =  ?');
            params.push(req.query.id);
        }

        if (req.query.member_id && typeof req.query.member_id == 'string') {
            conditions.push('member_id =  ?');
            params.push(req.query.member_id);
        }

        if (req.query.fee_amount && typeof req.query.fee_amount == 'string') {
            conditions.push('fee_amount =  ?');
            params.push(req.query.fee_amount);
        }

        if (req.query.due_date && typeof req.query.due_date == 'string') {
            conditions.push('due_date =  ?');
            params.push(req.query.due_date);
        }

        if (req.query.date_paid && typeof req.query.date_paid == 'string') {
            conditions.push('date_paid =  ?');
            params.push(req.query.date_paid);
        }

        if (req.query.payment_status && typeof req.query.payment_status == 'string') {
            switch (req.query.payment_status.toLowerCase()) {
                case 'paid':
                    conditions.push('date_paid <= due_date');
                    break;
                case 'unpaid':
                    conditions.push('date_paid IS NULL');
                    break;
                case 'paid late':
                    conditions.push('date_paid > due_date');
                    break;
                default:
                    res.status(400).json({ error: "Incorrect payment status" });
            }
        }

        if (req.query.semester && typeof req.query.semester == 'string') {
            conditions.push(`semester like '%${req.query.semester}%'`);
        }

        if (req.query.academic_year && typeof req.query.academic_year == 'string') {
            conditions.push('academic_year =  ?');
            params.push(req.query.academic_year);
        }
        if (req.query.order && typeof req.query.order == 'string') {
            order = ` ORDER BY ${req.query.order}`;
        }

        if (req.query.desc && req.query.desc == 'true') {
            order += " DESC";
        }
        if (conditions.length != 0) {
            query += " WHERE " + conditions.join(' AND ');
        }

        if (order) {
            query += order;
        }

        console.log(params);
        const conn = await pool.getConnection();
        try {
            console.log(query);
            const fees = await conn.query(query, params);
            res.json({ fees });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        } finally {
            conn.release();
        }

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export { getMembers, findDeletableMembers, findEligibleMembers, getUnpaidMembers, getExecutiveMembers, getMembersByRole, getLatePayments, getPercentage, getAlumni, getTotalFees, getHighestDebtor, editDetails, deleteMember, deleteEvent, addEvent, addFee, addMemberToOrganization, updateMemberToOrganization, getFees, updateFee, deleteFee };