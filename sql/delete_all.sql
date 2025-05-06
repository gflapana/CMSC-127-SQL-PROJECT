-- switch database
use studorg;

-- delete member, also deletes member from organization_has_member and fees GIVEN A KEY
DELETE FROM organization_has_member WHERE member_id=1;
DELETE FROM fee WHERE member_id=1;
DELETE FROM member WHERE member_id=1;
DELETE FROM organization WHERE organization_id NOT IN (SELECT organization_id FROM organization_has_member);

-- delete fee, deletes nothing as it is not a foreign key
DELETE FROM fee WHERE fee_id=1;

-- delete organization, deletes orgs and its members in org/stud table, its org fees, and events.
DELETE FROM organization_has_member WHERE organization_id=1;
DELETE FROM organization_event WHERE organization_id=1;
DELETE FROM fee WHERE organization_id=1;
DELETE FROM organization WHERE organization_id=1;

-- delete a member from the organization
DELETE FROM fee WHERE organization_id=1 AND member_id=1;
DELETE FROM organization_has_member WHERE organization_id=1 AND member_id=1;
DELETE FROM member WHERE member_id NOT IN (SELECT member_id FROM organization_has_member);

-- delete an event in the organization
DELETE organization_event WHERE organization_id=1 AND event_name="P20JECT YSES";

