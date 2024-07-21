import { Knex } from "knex";

const TABLE_NAME = "expense_group";

/**
 * Create table expense_group.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable(TABLE_NAME, (table) => {
        table.bigIncrements();

        table.string("expense_id", 100).notNullable().references("id").inTable("expenses").onDelete("cascade");

        table.bigInteger("user_group_id").notNullable().references("id").inTable("user_group").onDelete("cascade");

        table.timestamp("created_at").notNullable().defaultTo(knex.raw("now()"));

        table.bigInteger("created_by").unsigned().nullable().references("id").inTable(TABLE_NAME);

        table.timestamp("updated_at").nullable();

        table.bigInteger("updated_by").unsigned().references("id").inTable(TABLE_NAME).nullable();
    });
}

/**
 * Drop table expense_group.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable(TABLE_NAME);
}
