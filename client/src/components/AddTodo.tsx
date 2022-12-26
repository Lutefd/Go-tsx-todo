import {useState} from "react";
import {useForm} from "@mantine/form";
import {Button, Group, Modal} from "@mantine/core";
function  AddTodo(){
    const [open, setOpen] = useState(false);

    const form = useForm({
        initialValues: {titulo: '', body: ''},
    });

    return<>

    <Modal opened={open} onClose={() => setOpen(false)} title='Criar Tarefa'>
        texto
    </Modal>
    <Group position='center'>
        <Button fullWidth mb={12} onClick={() => setOpen(true)}>Adicionar Tarefa</Button>
    </Group>
    </>

}
export default AddTodo