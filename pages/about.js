import Layout from '../components/Layout'
import { CardHeader,Card, CardBody} from 'reactstrap'

export default function About() {
  return (
    <Layout>
      <Card>
        <CardHeader tag='h2'>About</CardHeader>
        <CardBody>
          <p>
            At the beginning of 2019, I went on a major cleaning spree. I was able to get rid of a lot of the nick nacks which didn't really
            matter and were easy decisions. The problem is after I got rid of these odds and ends, I was still left
            with quite a bit of belongings that I was unsure about keeping. Some of these items were fairly useful while others were
            nostalgic and sentimenal. This made the decision making process a lot more difficult for these things.
          </p>
          <p>
            Around the same time a show came out on Netflix called Tyding Up with Marie Kondo. I watched the first
            episode and thought her process of item sorting was really unique. What I took most from her process was
            thinking of each item and associating how much joy it gives you. Expanding upon Marie's idea, I wrote down
            each item I was unsure about keeping and next to each one would rate them between 1-5 on how happy
            they made me feel. After going through this exercise it made me realize that most of the items
            had fairly low levels of happiness. Another benefit was thinking about each item individually and not being
            overwhelmed by all of them as a whole when trying to decide which ones to keep.
          </p>
          <p>
            Out of this process came my idea for Tydii, just a simple and pleasing way to sort your items that you
            are unsure about keeping. I hope this little idea has helped you make your life a little more clean and
            organized.
          </p>
        <span className="icon-credits mt-auto">
          <p>Icon/Art Credits</p>
          <ul>
            <li>https://www.flaticon.com/free-icon/coffee-cup_633884?term=coffee%20cup&page=1&position=27</li>
            <li>https://www.flaticon.com/free-icon/question_1828934?term=question%20mark&page=1&position=24</li>
            <li>https://www.flaticon.com/free-icon/github_2111432?term=github&page=1&position=1</li>
            <li>https://www.flaticon.com/packs/smileys-9</li>
          </ul>
        </span>
      </CardBody>
      </Card>

    </Layout>
  )
}
