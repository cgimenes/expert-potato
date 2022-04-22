import { GetServerSideProps } from "next";
import { getSession, signOut, useSession } from "next-auth/react"
import { prisma } from '../../lib/prisma';
import Layout from "../../components/layout";
import Habits from "../../components/habits";

export default function App({ habits }) {
  const { data } = useSession();
  // const [newHabit, setNewHabit] = useState('');

  // function handleCreateHabit(event: FormEvent) {
  //   event.preventDefault();

  //   axios.post('/api/habits/create', { name: newHabit })
  // }

  return (
    <Layout user={data?.user}>
      <Habits habits={habits} />

      {/* <form onSubmit={handleCreateHabit}>
        <input type="text" value={newHabit} onChange={e => setNewHabit(e.target.value)} />
        <button type="submit">Save</button>
      </form> */}
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req })

  const habits = await prisma.habit.findMany({
    where: {
      user: {
        email: session.user.email
      }
    },
    select: {
      id: true,
      name: true,
      tags: {
        select: {
          tag: {
            select: {
              name: true,
              color: true
            }
          }
        }
      },
      progress: {
        select: {
          createdAt: true,
          type: true
        }
      },
      dailyHabit: {
        select: {
          days: true,
          howManyTimes: true
        }
      },
      weeklyHabit: true
    }
  })

  const data = habits.map(habit => {
    return {
      id: habit.id,
      name: habit.name,
      done: habit.progress.some(p => p.type === "DONE" && p.createdAt.setHours(0,0,0,0) == (new Date()).setHours(0,0,0,0)),
      tags: habit.tags.map(t => t.tag)
    }
  })

  return {
    props: {
      habits: data
    }
  }
}