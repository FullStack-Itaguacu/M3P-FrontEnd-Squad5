import { Popover, Text, Button } from '@mantine/core';

function InformacoesDetalhadasUser({ user }) {

  return (
    <Popover width={400} position="bottom" withArrow shadow="md">
      <Popover.Target>
        <Button variant="light" color="blue" fullWidth mt="md" radius="md" >Mais Informações</Button>
      </Popover.Target>
      <Popover.Dropdown>
        <Text size="sm">
          <div className="modal-body">

            <Text>
              <b>Data de Nascimento:</b> {user.birthDate}
            </Text>

            <Text>
              <b>Telefone:</b> {user.phone}
            </Text>

            <Text>
              <b>Tipo Usuário:</b> {user.typeUser}
            </Text>
            </div>   
        </Text>
      </Popover.Dropdown>
    </Popover>
  );
}

export default InformacoesDetalhadasUser;