CREATE OR REPLACE VIEW transaction_list
AS 
SELECT tr.id AS id,
       tr.description AS description,
       tr.date,
       tr.amount,
       acc.name AS accountName,
       toacc.name AS toAccountName,
       GROUP_CONCAT(ta.name ORDER BY ta.name) AS tags
  FROM transactions tr 
       LEFT JOIN accounts acc
           ON tr.account_id = acc.id
       LEFT JOIN accounts toacc
           ON tr.to_account_id = toacc.id
       LEFT JOIN transaction_tags tt
           ON tr.id = tt.transaction_id
       LEFT JOIN tags ta 
           ON ta.id = tt.tag_id
 GROUP BY tr.id         
;
