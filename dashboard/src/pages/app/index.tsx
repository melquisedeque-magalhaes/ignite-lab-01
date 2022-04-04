import { withPageAuthRequired } from "@auth0/nextjs-auth0";

export default function App() {
    return(
        <h1>Dashboard</h1>
    )
}

export const getServerSideProps = withPageAuthRequired();