import { withPageAuthRequired, getAccessToken } from "@auth0/nextjs-auth0";
import { GetServerSideProps } from "next";

export default function App() {
  return <h1>Dashboard</h1>;
}

// export const getServerSideProps = withPageAuthRequired();

// Get token user
export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const token = getAccessToken(req, res);

  // eslint-disable-next-line no-console
  console.log(token);

  return {
    props: {},
  };
};
