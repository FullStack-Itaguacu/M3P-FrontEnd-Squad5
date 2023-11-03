import { List } from "@mantine/core";

function ModalContent(produtos) {
  return (
    <List>
      {produtos.produtos.map((produto, id) => {
        return (
          <List.Item key={id}>
            {produto.name} {produto.labName} {produto.dosage}{" "}
            {produto.unitDosage}
          </List.Item>
        );
      })}
    </List>
  );
}

export default ModalContent;
