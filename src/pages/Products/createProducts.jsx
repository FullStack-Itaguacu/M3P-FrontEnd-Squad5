import { useNavigate } from "react-router-dom";
import { upperFirst } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import { IMaskInput } from 'react-imask';
import { toast } from 'react-toastify';

import {
    TextInput,
    Text,
    Paper,
    Group,
    Button,
    Stack,
    Image,
    Grid,
    Select
} from '@mantine/core';

const CreateProducts = () => {
    const type = 'registrar';
    const navigate = useNavigate();

    const form = useForm({
        initialValues: {
            medicinsName: '',
            labName: '',
            productPicture: '',
            dosage: '',
            productType: '',
            unityPrice: '',
            description: '',
            amount: ''
        },
    }
    )
    function regexInput(input) {
        const regex = /R\$(\d{1,3}(?:,\d{3})*)(?:\.\d{2})?/;
        const match = regex.exec(input);

        if (match && match[1]) {
            const unityPrice = match[1];
        }
    }
    const createProduct = async (values) => {

        const { medicinsName, labName, productPicture, dosage, productType, unityPrice, description, amount } = { ...values };

        const product = {
            medicinsName: medicinsName,
            labName: labName,
            productPicture: productPicture,
            dosage: dosage,
            productType: productType,
            unityPrice: unityPrice,
            description: description,
            amount: amount
        };

        try {
            const response = await fetch('http://localhost:3333/api/products/admin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ product }),
            });

            if (response.status === 201) {
                const responseSucesso = await response.json()
                form.reset()
                toast.success(responseSucesso.menssage)
            } else {
                const responseData = await response.json()
                if (responseData && (responseData.error || responseData.msg)) {
                    toast.info(responseData.error)
                } else {
                    toast.error('Erro no servidor. Contate o administrador do sistema!');
                }
            }
        } catch (error) {
            toast.error('Erro no servidor. Contate o administrador do sistema!');
        }

    }

    return (

        <Group position='center'>
            <FormStyleCreateUser>

                <Group>
                    <Image
                        src="LogoAppharma.png"
                        width={200}
                        height={200}
                        alt="Logomarca"
                        mx="auto" radius="md"
                    />
                </Group>
                <Paper radius="md" p="xl" withBorder >
                    <Text size="lg" weight={500}>
                        Cadastro de Produtos <br />
                    </Text>

                    <form onSubmit={form.onSubmit((values) => { registrarUsuario(values) })}>
                        <Stack>
                            <>
                                <Grid ml={0} mr={0}>
                                    <Grid.Col span={12}>
                                        <TextInput
                                            label="Nome do Medicamento"
                                            withAsterisk
                                            placeholder="Informe o nome"
                                            value={form.values.medicinsName}
                                            onChange={(event) => form.setFieldValue('medicinsName', event.currentTarget.value)}
                                            required
                                            radius="md"
                                        />
                                    </Grid.Col>
                                    <Grid.Col span={6}>
                                        <TextInput
                                            label="Nome do Laboratório"
                                            withAsterisk
                                            placeholder="Informe o nome"
                                            value={form.values.labName}
                                            onChange={(event) => form.setFieldValue('labName', event.currentTarget.value)}
                                            required
                                            radius="md"
                                        />
                                    </Grid.Col>
                                    <Grid.Col span={6}>
                                        <TextInput
                                            label="Imagem do Medicamento"
                                            withAsterisk
                                            placeholder="Informe o url"
                                            value={form.values.productPicture}
                                            onChange={(event) => form.setFieldValue('productPicture', event.currentTarget.value)}
                                            required
                                            radius="md"
                                        />
                                    </Grid.Col>
                                    <Grid.Col span={6}>
                                        <TextInput
                                            label="Dosagem"
                                            withAsterisk
                                            placeholder="Informe a dosagem"
                                            value={form.values.dosage}
                                            onChange={(event) => form.setFieldValue('dosage', event.currentTarget.value)}
                                            required
                                            radius="md"
                                        />
                                    </Grid.Col>
                                    <Grid.Col span={3}>
                                        <Select
                                            withAsterisk
                                            label="Tipo de Medicamento"
                                            required
                                            data={[
                                                '------Informe o Tipo------',
                                                'Medicamento Controlado',
                                                'Medicamento Não Controlado',
                                            ]}
                                            value={form.values.productType}
                                            onChange={(event) => form.setFieldValue('productType', event.currentTarget.value)}
                                            searchable
                                        />
                                    </Grid.Col>
                                    <Grid.Col span={6}>
                                        <TextInput
                                            label="Preço-Unitário"
                                            withAsterisk
                                            placeholder="R$000,00"
                                            mask="R$000,00"
                                            component={IMaskInput}
                                            required
                                            value={form.values.unityPrice}
                                            onChange={(event) => form.setFieldValue('unityPrice', event.currentTarget.value)}
                                        />
                                    </Grid.Col>
                                    <Grid.Col span={6}>
                                        <TextInput
                                            label="Descrição"
                                            withAsterisk
                                            placeholder="Informe a descrição"
                                            value={form.values.description}
                                            onChange={(event) => form.setFieldValue('description', event.currentTarget.value)}
                                            radius="md"
                                        />
                                    </Grid.Col>
                                    <Grid.Col span={6}>
                                        <TextInput
                                            label="Quantidade"
                                            withAsterisk
                                            type="number"
                                            value={form.values.amount}
                                            onChange={(event) => form.setFieldValue('amount', event.currentTarget.value)}
                                            radius="md"
                                        />
                                    </Grid.Col>
                                </Grid>
                            </>
                        </Stack>

                        <Group position="apart" mt="xl">
                            <Button type="submit" radius="xl">
                                {upperFirst(type)}
                            </Button>
                        </Group>
                    </form>
                </Paper>
            </FormStyleCreateUser>
        </Group>
    );
}

export default CreateProducts