import './App.css'
import useSWR from 'swr'
import {Box, List} from "@mantine/core";
import AddTodo from "./components/AddTodo";

export interface Todo{
    id: number
    titulo: string
    descrição: string
    feito: boolean
}

export const ENDPOINT = 'http://localhost:4000'

const fetcher = (url: string) => fetch(`${ENDPOINT}/${url}`).then((res) => res.json())
function App() {
    const {data, mutate} = useSWR<Todo[]>('api/todos', fetcher)
  return (
    <Box>
        <List spacing='xs' size='sm' mb={12} center>
        {data?.map((todo) => {
            return (
                <List.Item key={`todo__${todo.id}`}><h2>{todo.titulo}</h2><br/><p>{todo.descrição}</p></List.Item>
            )
        })}
        </List>
        <AddTodo mutate={mutate}/>
    </Box>
  )
}

export default App
