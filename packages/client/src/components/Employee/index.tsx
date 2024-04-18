import { useState } from "react";
import { trpc } from "../../lib/trpc";
import { IoPersonAdd, IoPersonAddOutline } from "react-icons/io5";
import { BsLock, BsPen } from "react-icons/bs";
import { FiDelete } from "react-icons/fi";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
const Employee = () => {
  const dependents = trpc.employee.getDependents.useQuery();
  const addDependents = trpc.employee.addDependent.useMutation();
  const trpcContext = trpc.useContext();
  const [data, setData] = useState({
    name: "",
    relation: "",
  });
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div className="w-full">
      <div className="flex items-center p-6 justify-between bg-blue-100">
        <div>
          <h1 className="text-2xl text-blue-900 font-semibold">Dependents</h1>
          <p className="text-md">Manage all the dependents from here</p>
        </div>
        <button
          onClick={onOpen}
          className="flex items-center space-x-2 py-3 px-4 bg-blue-900 text-white rounded-md"
        >
          <IoPersonAddOutline />
          <p>Add Dependents</p>
        </button>
      </div>
      <div className="flex h-screen">
        <div className="p-8 flex flex-col space-y-3 w-full">
          {dependents?.data?.dependents?.map((e) => (
            <div
              key={e.id}
              className="flex w-full justify-between border px-3 py-2 rounded-md items-center"
            >
              <div className="flex space-x-4">
                <img
                  src={`https://api.dicebear.com/8.x/pixel-art/svg?seed=${e.name}`}
                  className="w-[40px] h-[40px] rounded-full"
                />
                <div>
                  <p>{e.name}</p>
                  <div className="flex space-x-3 text-sm">
                    <p>12/03/2002</p>
                    <p>{e.relation}</p>
                  </div>
                </div>
              </div>
              <div className="flex space-x-3">
                <BsPen />
                <FiDelete />
              </div>
            </div>
          ))}
        </div>
        <div className="w-1/2 border-l-2 flex flex-col justify-center items-center">
          <div className="p-2 rounded-full bg-blue-100 w-fit">
            <BsLock size={23} className="text-blue-900" />
          </div>
          <p>No dependents selected</p>
        </div>
      </div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add a Dependent</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className="flex flex-col space-y-3">
              <input
                placeholder="Enter Dependent Name"
                value={data.name}
                onChange={(e) => {
                  setData({ ...data, name: e.target.value });
                }}
                className="border p-2"
              />
              <input
                placeholder="Enter Relation"
                value={data.relation}
                className="border p-2"
                onChange={(e) => {
                  setData({ ...data, relation: e.target.value });
                }}
              />
            </div>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
              onClick={() => {
                addDependents.mutate(
                  {
                    name: data.name,
                    relation: data.relation,
                  },
                  {
                    onSuccess: () => {
                      console.log("Dependent Added");
                      trpcContext.employee.getDependents.invalidate();
                      onClose();
                    },
                    onError: () => {
                      console.log("Error while adding a dependent");
                      onClose();
                    },
                  }
                );
              }}
              variant="ghost"
            >
              Add Dependent
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Employee;
