import { GetServerSideProps } from "next";
import { getSession, useSession } from "next-auth/react";
import Layout from "../../components/layout";
import { prisma } from "../../lib/prisma";

function humanize(str) {
  return str
    .toLowerCase()
    .replace(/^[a-z]/g, function(first) {
      return first.toUpperCase()
    })
}

export default function Tags({ tags }) {
  const { data } = useSession();

  return (
    <Layout title="Tags" user={data?.user}>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Color</th>
          </tr>
        </thead>
        <tbody>
          {tags.map(tag => (
            <tr key={tag.id}>
              <td>{tag.name}</td>
              <td>{humanize(tag.color)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req })

  const tags = await prisma.tag.findMany({
    where: {
      userId: session.userId
    },
    select: {
      id: true,
      name: true,
      color: true
    }
  })

  return {
    props: {
      tags
    }
  }
}