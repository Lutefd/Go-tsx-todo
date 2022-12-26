import './App.css'
import useSWR from 'swr'
import {Box, List, ThemeIcon} from "@mantine/core";
import AddTodo from "./components/AddTodo";
import {CheckCircleFillIcon} from "@primer/octicons-react";

export interface Todo {
    id: number
    titulo: string
    descrição: string
    feito: boolean
}

export const ENDPOINT = 'http://localhost:4000'

const fetcher = (url: string) => fetch(`${ENDPOINT}/${url}`).then((res) => res.json())

function App() {
    const {data, mutate} = useSWR<Todo[]>('api/todos', fetcher)

    async function markTodoAsDone(id: number) {
        const updated = await fetch(`${ENDPOINT}/api/todos/${id}/done`, {
            method: 'PATCH',
        }).then((res) => res.json())
        mutate(updated)
    }

    return (
        <Box sx={(theme) => ({
            padding: '2rem',
            width: '100%',
            maxWidth: '40rem',

        })
        }>
            <List spacing='xs' size='sm' mb={12} center>
                {data?.map((todo) => {
                    return (
                        <List.Item
                            key={`todo__${todo.id}`}
                            icon={todo.feito ? (
                                    <ThemeIcon color='teal' size={24} radius='xl'>
                                        <CheckCircleFillIcon size={22}/>
                                    </ThemeIcon>)
                                : (<ThemeIcon color='gray' size={24} radius='xl'>
                                    <CheckCircleFillIcon size={22}/>
                                </ThemeIcon>)
                            }
                            onClick={() => markTodoAsDone(todo.id)}
                        >
                            <h2>{todo.titulo}</h2>
                            <p>{todo.descrição}</p>
                        </List.Item>
                    )
                })}
            </List>
            <AddTodo mutate={mutate}/>
        </Box>
    )
}

export default App
