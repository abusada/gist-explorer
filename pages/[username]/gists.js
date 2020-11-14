import { Flex, Button, Heading, Link, Text, View } from "@adobe/react-spectrum";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { useMemo } from "react";
import Layout from "../../components/Layout";

const Tag = ({ children }) => (
  <View
    borderWidth="thin"
    borderColor="dark"
    padding="size-100"
    marginEnd="size-100"
    borderRadius="large"
  >
    {children}
  </View>
);

const FileTypes = ({ files }) => {
  const uniqueLanuages = useMemo(() => {
    const languages = Object.values(files)
      .map((file) => file.language)
      .filter(Boolean)
      .sort();
    const dedupe = Array.from(new Set(languages));
    return dedupe;
  }, [files]);
  return (
    <Flex>
      {uniqueLanuages.map((lang) => (
        <Tag>{lang}</Tag>
      ))}
    </Flex>
  );
};

const DateFromNow = ({ date }) =>
  formatDistanceToNow(new Date(date), { addSuffix: true });

// const getFallbackDesc = files => Object.keys(files)[0]
const GistCard = ({ description, files, html_url, username, created_at }) => {
  const title = username + "/" + Object.keys(files)[0];
  return (
    <View
      borderWidth="thin"
      borderColor="dark"
      padding="size-250"
      marginBottom="size-250"
    >
      <Flex direction="column" gap="size-100">
        <Link>
          <a target="_blank" href={html_url}>
            {title}
          </a>
        </Link>
        {description && <Text>{description}</Text>}
        <FileTypes files={files} />
      </Flex>
    </View>
  );
};

function UserGist({ username, data }) {
  return (
    <Layout>
      <View width="size-6000">
        <Heading>Gists for {username}</Heading>
        {data.map((item) => (
          <GistCard key={item.id} username={username} {...item} />
        ))}
      </View>
    </Layout>
  );
}

export async function getServerSideProps({ params }) {
  const { username } = params;
  const res = await fetch(`https://api.github.com/users/${username}/gists`);
  const data = await res.json();
  return {
    props: { username, data },
  };
}
export default UserGist;
