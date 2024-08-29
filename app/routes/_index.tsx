import { useState, useEffect } from 'react';
import type { MetaFunction } from "@remix-run/node";
import { get } from 'aws-amplify/api';

const getApi = async () => {
  const restOptions = get({
    apiName: 'appRunnerApi',
    path: '/',
  });
  const { body } = await restOptions.response;
  return body.text();
}

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix SPA" },
    { name: "description", content: "Welcome to Remix (SPA Mode)!" },
  ];
};

export default function Index() {
  const [data, setData] = useState<string | null>(null);

  useEffect(() => {
    async function getData() {
      const result = await getApi();
      setData(result);
    }
    getData();
  }, []);

  return (
    <div className="font-sans p-4">
      Data from API : {data}
    </div>
  );
}
