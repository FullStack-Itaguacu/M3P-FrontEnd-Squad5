import { Text, TextInput, Button, Group, Paper, Grid, Title, Select, Textarea, NumberInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { toast } from 'react-toastify';
import { FormStyleCreateProduct } from './styled';
import { useAuth } from "../../context/AuthContext";
import { IMaskInput } from 'react-imask';

const FormCreateProduct = () => {
  
const { token } = useAuth();

  const form = useForm({
    initialValues: {
      name: '',
      labName: '',
      imageLink: '',
      dosage: '',
      unitDosage: '',
      description: '',
      unitPrice: '',
      typeProduct: '',
      totalStock: ''
    },

    validate: {

    },
  
  });

  const registrarProduto = async (values) => {

    const { name, labName, imageLink, dosage, unitDosage, description, unitPrice, typeProduct, totalStock } = { ...values };
    try {
      const response = await fetch('http://localhost:3333/api/products/admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body: JSON.stringify({ name, labName, imageLink, dosage, unitDosage, description, unitPrice, typeProduct, totalStock  }),
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
    <FormStyleCreateProduct>
    <Paper radius="md" p="xl" withBorder >
          <Text size="lg" weight={500}>
          Cadastro de Produto <br />
          </Text>
      <Title order={2} color="white" ml={10} mr={10}>Cadastro de Produto:</Title>
      <form onSubmit={form.onSubmit((values) => registrarProduto(values))}>

        <Grid ml={10} mr={10}>
          <Grid.Col span={6}>
            <TextInput
              withAsterisk
              label="Produto"
              color='white'
              placeholder="Informe o nome do Produto"
              required
              {...form.getInputProps('name')}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <TextInput
              withAsterisk
              label="Laboratório"
              placeholder="Informe a laboratório"
              required
              {...form.getInputProps('labName')}
            />
          </Grid.Col>
          <Grid.Col span={3}>
            <TextInput
              withAsterisk
              label="Dosagem"
              placeholder="Informe a Dosagem"
              required
              {...form.getInputProps('dosage')}
            />
          </Grid.Col>
          <Grid.Col span={3}>
          <Select
              data={['mg', 'mcg', 'g', 'ml', '%', 'Outro']}
              withAsterisk
              label="Unidade Dosagem"
              placeholder="Informe a Unidade da Dosagem"
              required
              {...form.getInputProps('unitDosage')}
            />
           
          </Grid.Col>
          
          <Grid.Col span={3}>
            <NumberInput
              withAsterisk
              label="Preço Unitário"
              placeholder="0.00"
              allowDecimal={true}
              decimalSeparator="."
              decimalScale={4}
              precision={2}
              defaultValue={2.2}
              required
              {...form.getInputProps('unitPrice')}
            />
          </Grid.Col>

          <Grid.Col span={3}>
            <Select
              data={['controlado', 'não controlado']}
              withAsterisk
              label="Tipo"
              placeholder="Selecione o tipo do Medicamento"
              required
              {...form.getInputProps('typeProduct')}
            />
          </Grid.Col>
          
          <Grid.Col span={6}>
            <TextInput
              label="Link da imagem"
              placeholder="Informe o link da imagem"
              {...form.getInputProps('imageLink')}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <NumberInput
              withAsterisk
              label="Quantidade em estoque"
              placeholder="Informe a quantidade em estoque"
              required
              {...form.getInputProps('totalStock')}
            />
          </Grid.Col>
          <Grid.Col span={12} >
            <Textarea
              label="Descrição"
              placeholder="Descrição do medicamento"
              minRows={10}
              maxRows={10}
              {...form.getInputProps('description')}
            />
          </Grid.Col>

        </Grid>
        <Group position="right" mt="md">
          <Button color="gray" onClick={() => form.reset()}>Limpar</Button>
          <Button type="submit">Salvar</Button>
        </Group>
      </form>
      </Paper>
    </FormStyleCreateProduct>
    </Group>
  );
}



export default FormCreateProduct;