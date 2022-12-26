import {useState} from "react";
import {useForm} from "@mantine/form";
import {Button, Group, Modal, Textarea, TextInput} from "@mantine/core";
import {ENDPOINT} from "../App";
function  AddTodo(){
    const [open, setOpen] = useState(false);

    const form = useForm({
        initialValues: {titulo: '', descricao: ''},
    });

    async function createTodo(values: {titulo: string, descricao: string}){

        const updated = await fetch(`${ENDPOINT}/api/todos`, {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values),
        }).then(res => res.json())
        form.reset()

        setOpen(false)
    }

    return<>

    <Modal opened={open} onClose={() => setOpen(false)} title='Criar Tarefa'>
        <form onSubmit={form.onSubmit(createTodo)}>
            <TextInput required mb={12} label='Tarefa' placeholder='O que você quer fazer?' {...form.getInputProps('titulo')}/>
            <Textarea required mb={12} label='Descrição' placeholder='Descreva sua tarefa' {...form.getInputProps('descrição')}/>

            <Button type='submit'>Criar Tarefa</Button>
        </form>
    </Modal>
    <Group position='center'>
        <Button fullWidth mb={12} onClick={() => setOpen(true)}>Adicionar Tarefa</Button>
    </Group>
    </>

}
export default AddTodo