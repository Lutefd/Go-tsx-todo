import './App.css'
import useSWR from 'swr'
import {Box} from "@mantine/core";
import AddTodo from "./components/AddTodo";

export const ENDPOINT = 'http://localhost:4000'

const fetcher = (url: string) => fetch(`${ENDPOINT}/${url}`).then((res) => res.json())
function App() {
    const {data, mutate} = useSWR('api/todos', fetcher)
  return (
    <Box>
        <h1>{JSON.stringify(data)}</h1>
        <AddTodo/>
    </Box>
  )
}

export default App
