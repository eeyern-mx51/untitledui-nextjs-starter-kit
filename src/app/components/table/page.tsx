"use client";

import { Table, TableCard } from "@/components/application/table/table";
import { Badge } from "@/components/base/badges/badges";
import { ComponentPage, Section } from "../_shared/component-page";

const columns = [
    { id: "name", name: "Name", isRowHeader: true },
    { id: "role", name: "Role" },
    { id: "status", name: "Status" },
];

const rows = [
    { id: "1", name: "Olivia Rhye", role: "Designer", status: "Active" },
    { id: "2", name: "Phoenix Baker", role: "Engineer", status: "Active" },
    { id: "3", name: "Lana Steiner", role: "Product", status: "Inactive" },
    { id: "4", name: "Demi Wilkinson", role: "Designer", status: "Active" },
];

export default function TablePage() {
    return (
        <ComponentPage title="Table" description="Data display with sorting and row actions.">
            <Section title="Default">
                <TableCard.Root>
                    <TableCard.Header title="Team members" description="Manage your team and their account permissions." />
                    <Table>
                        <Table.Header columns={columns}>
                            {(column) => <Table.Head isRowHeader={column.isRowHeader}>{column.name}</Table.Head>}
                        </Table.Header>
                        <Table.Body items={rows}>
                            {(row) => (
                                <Table.Row>
                                    <Table.Cell>{row.name}</Table.Cell>
                                    <Table.Cell>{row.role}</Table.Cell>
                                    <Table.Cell>
                                        <Badge color={row.status === "Active" ? "success" : "gray"} size="sm">
                                            {row.status}
                                        </Badge>
                                    </Table.Cell>
                                </Table.Row>
                            )}
                        </Table.Body>
                    </Table>
                </TableCard.Root>
            </Section>
        </ComponentPage>
    );
}
