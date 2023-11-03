import { useNavigate } from "react-router-dom";
import { upperFirst } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import { IMaskInput } from 'react-imask';
import { toast } from 'react-toastify';
import { FormStyleCreateUser } from './styled'
import { DateInput, DatesProvider } from '@mantine/dates';
import 'dayjs/locale/pt-br';
import dayjs from 'dayjs';
import ValidarCPF from '../utils/ValidarCPF';
import BuscaCEP from './BuscaCep';
import { useAuth } from "../../context/AuthContext";
import { useLocation } from 'react-router-dom';
import {  useEffect } from "react";

import {
  TextInput,
  NumberInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  Button,
  Anchor,
  Stack,
  Grid,
  Select
} from '@mantine/core';

const FormCreateUserAdm = () => {
 
  const location = useLocation();

  const type = 'registrar';
  const navigate = useNavigate();
  const { token } = useAuth();

  const form = useForm({
    initialValues: {
      email: '',
      cpf: '',
      fullName: '',
      birthDate: '',
      password: '',
      phone: '',
      zip: '',
      street: '',
      numberStreet: '',
      neighborhood: '',
      city: '',
      state: '',
      complement: '',
      lat: '',
      lon: '',
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Email inválido'),
      zip: (val) => (/^\d{2}\d{3}[-]\d{3}$/.test(val) ? null : 'CEP Inválido'),
      password: (val) => (/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{8,30}$/.test(val) ? null : 'A senha precisa ter pelo menos 8 caracteres, 1 letra e 1 número'),
      cpf: (val) => (ValidarCPF(val) ? null : 'CPF Inválido'),
    },
    transformValues: (values) => {
      return {
        ...values,
        birthDate: dayjs(values.birthDate).format('YYYY-MM-DD'),
        cpf: values.cpf.match(/\d/g).join(""),
        zip: values.zip.match(/\d/g).join(""),
        phone: values.phone.match(/\d/g).join("")

      }
    }
  });

  useEffect(() => {
    if (location.state) {
      form.setFieldValue('fullName', location.state.fullName)
      form.setFieldValue('cpf', location.state.cpf)
      form.setFieldValue('birthDate', location.state.birthDate)
      form.setFieldValue('email', location.state.email)
      form.setFieldValue('phone', location.state.phone)
      form.setFieldValue('typeUser', location.state.typeUser)     
    } else {
      form.reset()
    }
  }, [location])

  function onchangeCep(values) {
    form.setFieldValue('street', values.logradouro)
    form.setFieldValue('neighborhood', values.bairro)
    form.setFieldValue('city', values.cidade)
    form.setFieldValue('state', values.estado)
    form.setFieldValue('lat', values.latitude)
    form.setFieldValue('lon', values.longitude)
  }

  function parseDate(input) {
    const regex = /(?<dia>\d{2})[-|/]?(?<mes>\d{2})[-|/]?(?<ano>\d{4})/gd;

    const match = regex.exec(input);

    if (match && match.groups) {
      return new Date(Number(match.groups.ano), Number(match.groups.mes) - 1, Number(match.groups.dia));
    }

    return null;
  }

  const registrarUsuario = async (values) => {

    const { cpf, birthDate, email, fullName, password, phone, zip, street, numberStreet, neighborhood, city, state, complement, lat, lon, typeUser } = { ...values };

    const user = {
      fullName: fullName,
      cpf: cpf,
      birthDate: birthDate,
      email: email,
      phone: phone,
      password: password,
      typeUser: typeUser
    };

    const address = [
      {
        zip: zip,
        street: street,
        numberStreet: numberStreet,
        neighborhood: neighborhood,
        city: city,
        state: state,
        complement: complement,
        lat: lat,
        lon: lon
      },
    ];


    try {
      const response = await fetch('http://localhost:3333/api/user/admin/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body: JSON.stringify({ user, address }),
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

        <Paper radius="md" p="xl" withBorder >
          <Text size="lg" weight={500}>
            Cadastro de Usuário <br />
          </Text>

          <form onSubmit={form.onSubmit((values) => { registrarUsuario(values) })}>
            <Stack>
              <>
                <Grid ml={0} mr={0}>
                  <Grid.Col span={12}>
                    <TextInput
                      label="Nome Completo"
                      withAsterisk
                      placeholder="Informe o nome"
                      value={form.values.fullName}
                      onChange={(event) => form.setFieldValue('fullName', event.currentTarget.value)}
                      required
                      radius="md"
                    />
                  </Grid.Col>
                  <Grid.Col span={6}>
                    <TextInput
                      label="CPF"
                      withAsterisk
                      placeholder="Informe o CPF"
                      mask="000.000.000-00"
                      component={IMaskInput}
                      required
                      {...form.getInputProps('cpf')}
                      radius="md"
                    />
                  </Grid.Col>
                  <Grid.Col span={6}>
                    <DatesProvider settings={{ locale: 'pt-br', firstDayOfWeek: 0, weekendDays: [0], timezone: 'UTC' }}>
                      <DateInput
                        withAsterisk
                        maxLength={10}
                        allowFreeInput
                        valueFormat="DD/MM/YYYY"
                        label="Data Nascimento"
                        placeholder="Data Nascimento"
                        dateParser={parseDate}
                        locale="pt-br"
                        required
                        {...form.getInputProps('birthDate')}
                      />
                    </DatesProvider>
                  </Grid.Col>
                  <Grid.Col span={6}>
                    <TextInput
                      label="Telefone"
                      withAsterisk
                      placeholder="(99) 99999-9999"
                      mask="(00) 00000-0000"
                      component={IMaskInput}
                      required
                      {...form.getInputProps('phone')}
                    />
                  </Grid.Col>
                  <Grid.Col span={12}>
                    <Text size="lg" weight={500}>
                      Endereço<br />
                    </Text>
                  </Grid.Col>
                  <Grid.Col span={12}>
                    <BuscaCEP
                      cep={form.getInputProps('zip').value}
                      onChangeCep={onchangeCep}
                      onChange={form.getInputProps('zip').onChange}
                    />
                  </Grid.Col>
                  <Grid.Col span={9}>
                    <TextInput
                      withAsterisk
                      label="Logradouro"
                      placeholder="Rua/Avenida/Servidão . . ."
                      required
                      {...form.getInputProps('street')}
                    />
                  </Grid.Col>

                  <Grid.Col span={3}>
                    <NumberInput
                      withAsterisk
                      label="Número"
                      placeholder="Informe o Número"
                      required
                      {...form.getInputProps('numberStreet')}
                    />
                  </Grid.Col>
                  <Grid.Col span={12}>
                    <TextInput
                      label="Complemento"
                      placeholder="Ex: Apto 205 C"
                      {...form.getInputProps('complement')}
                    />
                  </Grid.Col>

                  <Grid.Col span={5}>
                    <TextInput
                      withAsterisk
                      label="Bairro"
                      placeholder="Informe o Bairro"
                      required
                      {...form.getInputProps('neighborhood')}
                    />
                  </Grid.Col>
                  <Grid.Col span={4}>
                    <TextInput
                      withAsterisk
                      label="Cidade"
                      placeholder="Informe a Cidade"
                      required
                      {...form.getInputProps('city')}
                    />
                  </Grid.Col>
                  <Grid.Col span={3}>
                    <Select
                      withAsterisk
                      label="Estado"
                      placeholder="Informe o Estado"
                      required
                      data={['AC',
                        'AL',
                        'AP',
                        'AM',
                        'BA',
                        'CE',
                        'DF',
                        'ES',
                        'GO',
                        'MA',
                        'MT',
                        'MS',
                        'MG',
                        'PA',
                        'PB',
                        'PR',
                        'PE',
                        'PI',
                        'RJ',
                        'RN',
                        'RS',
                        'RO',
                        'RR',
                        'SC',
                        'SP',
                        'SE',
                        'TO'
                      ]}
                      searchable
                      {...form.getInputProps('state')}
                    />
                  </Grid.Col>

                  <Grid.Col span={6}>
                    <TextInput
                      label="Latitude"
                      placeholder="Latitude"
                      {...form.getInputProps('lat')}
                    />
                  </Grid.Col>
                  <Grid.Col span={6}>
                    <TextInput
                      label="Longitude"
                      placeholder="Longitude"
                      {...form.getInputProps('lon')}
                    />
                  </Grid.Col>
                  <Grid.Col span={6}>
                
                   <Select
                      withAsterisk
                      label="Tipo Usuário"
                      placeholder="Informe o tipo de usuário"
                      required
                      data={['comprador', 'administrador'
                        
                      ]}
                      searchable
                      {...form.getInputProps('typeUser')}
                    />
                  </Grid.Col>
                </Grid>
              </>


              <TextInput
                required
                label="Email"
                placeholder="Ex: joao@email.com"
                value={form.values.email}
                onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
                error={form.errors.email && 'Email inválido'}
                radius="md"
              />

              <PasswordInput
                required
                label="Senha"
                placeholder="Sua senha"
                value={form.values.password}
                onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
                error={form.errors.password && 'A senha precisa ter pelo menos 8 caracteres, 1 letra e 1 número'}
                radius="md"
              />
            </Stack>

            <Group position="apart" mt="xl">
              <Anchor
                component="button"
                type="button"
                color="dimmed"
                onClick={() => navigate("/Login")}
                size="xs"
              >
                Já possui uma conta? Entrar

              </Anchor>
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

export default FormCreateUserAdm;