import { useEffect, useState } from "react"
import { Card } from '@mantine/core';

export default function UserResults() {
    const [updateList, setUpdateList] = useState(false)
    const [list, setList] = useState([])

    useEffect(() => {
        const charge = async () => {
            try {
                const response = await axios.get("http://localhost:3333/api/sales/dashboard/admin");
                setList(response.data);
            } catch (error) {
                console.error("Error fetching list of deposits:", error);
            }
        };
        charge();
    }, [updateList]);

    {
        list.map((storage, index) => {
            return (
                <div key={index}>
                    <Card shadow="sm" padding="lg" radius="md" withBorder>
                        <Card.Section>
                            <Text fw={500}>Resultados</Text>
                        </Card.Section>
                        <Group justify="space-between" mt="md" mb="xs">
                            <Text fw={500}>{storage.list}</Text>
                            <Badge color="red" variant="light">
                                Ao vivo
                            </Badge>
                        </Group>
                    </Card>
                </div>
            )
        })
    }
}