import './App.css'
import useSWR from 'swr'
import {Box} from "@mantine/core";
import AddTodo from "./components/AddTodo";

export interface Todo{
    id: number
    titulo: string
    descricao: string
    feito: boolean
}

export const ENDPOINT = 'http://localhost:4000'

const fetcher = (url: string) => fetch(`${ENDPOINT}/${url}`).then((res) => res.json())
function App() {
    const {data, mutate} = useSWR<Todo[]>('api/todos', fetcher)
  return (
    <Box>
        <h1>{JSON.stringify(data)}</h1>
        <AddTodo mutate={mutate}/>
    </Box>
  )
}

export default App
