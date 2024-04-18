import { BsArrow90DegRight, BsLock } from "react-icons/bs";
import { trpc } from "../../lib/trpc";
import { IoPersonAddOutline } from "react-icons/io5";
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
import { useState } from "react";
const HR = () => {
  const employees = trpc.hr.getAllEmployee.useQuery();
  const addEmployee = trpc.hr.addEmployee.useMutation();
  const trpcContext = trpc.useContext();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  return (
    <div className="w-full">
      <div className="flex items-center p-6 justify-between bg-blue-100">
        <div>
          <h1 className="text-2xl text-blue-900 font-semibold">Employees</h1>
          <p className="text-md">Find all employees here</p>
        </div>
        <button
          onClick={onOpen}
          className="flex items-center space-x-2 py-3 px-4 bg-blue-900 text-white rounded-md"
        >
          <IoPersonAddOutline />
          <p>Add Employee</p>
        </button>
      </div>
      <div className="flex h-screen">
        <div className="p-4 flex flex-col space-y-4 w-full">
          {employees?.data?.employees?.map((e) => (
            <div
              key={e.id}
              className="flex cursor-pointer w-full justify-between border px-3 py-2 rounded-md items-center"
            >
              <div className="flex space-x-4">
                <img
                  src={`https://api.dicebear.com/8.x/pixel-art/svg?seed=${e.name}`}
                  className="w-[40px] h-[40px] rounded-full"
                />
                <div>
                  <p>{e.name}</p>
                  <div className="flex space-x-3 text-sm">
                    <p>{e.id} | </p>
                    <p>Employee</p>
                  </div>
                </div>
              </div>
              <div className="flex space-x-3">
                <BsArrow90DegRight />
              </div>
            </div>
          ))}
        </div>
        <div className="w-1/2 border-l-2 flex flex-col justify-center items-center">
          <div className="p-2 rounded-full bg-blue-100 w-fit">
            <BsLock size={23} className="text-blue-900" />
          </div>
          <p>No employees selected</p>
        </div>
      </div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add an Employee</ModalHeader>
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
                placeholder="Enter Email"
                value={data.email}
                className="border p-2"
                onChange={(e) => {
                  setData({ ...data, email: e.target.value });
                }}
              />
              <input
                placeholder="Enter Password"
                value={data.password}
                className="border p-2"
                onChange={(e) => {
                  setData({ ...data, password: e.target.value });
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
                addEmployee.mutate(
                  {
                    name: data.name,
                    email: data.email,
                    password: data.password,
                  },
                  {
                    onSuccess: () => {
                      console.log("Employee Added");
                      trpcContext.hr.getAllEmployee.invalidate();
                      onClose();
                    },
                    onError: () => {
                      console.log("Error while adding a employee");
                      onClose();
                    },
                  }
                );
              }}
              variant="ghost"
            >
              Add Employee
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default HR;
