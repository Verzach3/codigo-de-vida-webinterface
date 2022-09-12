import { Table, Button, Group, ActionIcon } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { IS_LOGGED_IN, SERVER_URL } from "./state/State";
import Pocketbase from "pocketbase";
import { useRecoilState } from "recoil";
import { UserData } from "./types/userData";
import { IconEye, IconPencil, IconTrash } from "@tabler/icons";

export default function PatientsManager() {
  const client = new Pocketbase(SERVER_URL);
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(IS_LOGGED_IN);
  const [records, setRecords] = useState<UserData[] | undefined>(undefined);
  const [manual, setManual] = useState(false);
  useEffect(() => {
    const results = client.records.getList("pacientes", 1).then((records) => {
      console.log(records.items);
      setRecords(records.items as unknown as UserData[]);
    });
    return () => {};
  }, [isLoggedIn, manual]);

  return (
    <div>
      <Button onClick={() => setManual((val) => !val)}>Refresh</Button>
      <Table>
        <thead>
          <tr>
            <th>id</th>
            <th>Nombres</th>
            <th>Apellidos</th>
            <th>Edad</th>
            <th>Sangre</th>
            <th>Direccion</th>
            <th>Telefono</th>
            <th>Cedula</th>
            <th>Nombres Acudiente</th>
            <th>Apellidos Acudiente</th>
            <th>Telefono Acudiente</th>
            <th>Direccion Acudiente</th>
            <th>Opciones</th>
          </tr>
        </thead>
        <tbody>{
          records?.map((record) => {return (
            <tr key={record.id}>
              <td>{record.id}</td>
              <td>{record.nombres}</td>
              <td>{record.apellidos}</td>
              <td>{record.edad}</td>
              <td>{record.sangre}</td>
              <td>{record.direccion}</td>
              <td>{record.telefono}</td>
              <td>{record.cedula}</td>
              <td>{record.nombres_acudiente}</td>
              <td>{record.apellidos_acudiente}</td>
              <td>{record.telefono_acudiente}</td>
              <td>{record.direccion_acudiente}</td>
              <td><Group>
                  <ActionIcon color={"blue"} variant="filled"  onClick={() => {client.records.delete("pacientes", record.id); setManual((val) => !val)}}>
                    <IconTrash/>
                  </ActionIcon>
                  <ActionIcon color={"blue"} variant="filled" >
                    <IconPencil/>
                  </ActionIcon>
                  <ActionIcon color={"blue"} variant="filled" >
                    <IconEye/>
                  </ActionIcon>
                </Group></td>
            </tr>
          )})
          }</tbody>
      </Table>
    </div>
  );
}
