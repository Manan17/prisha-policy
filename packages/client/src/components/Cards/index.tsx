import { useState } from "react";
import { trpc } from "../../lib/trpc";

export default function Cards() {
  const [data, setData] = useState({
    name: "",
    desc: "",
  });
  const addInsurance = trpc.insurance.create.useMutation();
  const list = trpc.insurance.getAll.useQuery();
  const trpcContext = trpc.useContext();
  return (
    <div>
      <div>
        {list?.data?.map((l) => (
          <h1 key={l.id}>{l.name}</h1>
        ))}
      </div>
      <input
        placeholder="Enter Policy Name: "
        value={data.name}
        onChange={(e) => {
          setData({ ...data, name: e.target.value });
        }}
      />
      <input
        placeholder="Enter Description: "
        value={data.desc}
        onChange={(e) => {
          setData({ ...data, desc: e.target.value });
        }}
      />
      <button
        onClick={() => {
          addInsurance.mutate(
            {
              name: data.name,
              desc: data.desc,
            },
            {
              onSuccess: () => {
                console.log("Policy Added");
                trpcContext.insurance.getAll.invalidate();
              },
              onError: () => {
                console.log("Error");
              },
            }
          );
        }}
      >
        Add
      </button>
    </div>
  );
}
