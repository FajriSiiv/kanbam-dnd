import { Flex, Heading, Text } from "@chakra-ui/react";
import Head from "next/head";
import dynamic from "next/dynamic";
import React, { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";

const Column = dynamic(() => import("../src/Column"), { ssr: false });

const reorderColumnList = (sourceCol, startIndex, endIndex) => {
  const newTaskIds = Array.from(sourceCol.taskIds);

  const [removed] = newTaskIds.splice(startIndex, 1);
  newTaskIds.splice(endIndex, 0, removed);

  const newColumn = {
    ...sourceCol,
    taskIds: newTaskIds,
  };
  return newColumn;
};

export default function Home() {
  const [state, setState] = useState(initialData);

  const onDragEnd = (result) => {
    const { destination, source } = result;

    // jika user berusaha untuk drop di tempat aneh
    if (!destination) return;

    // jika user drag and drop ke source
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // jika user drop di colum yang sama tapi beda tempat/urutan
    const sourceCol = state.columns[source.droppableId];
    const destinationCol = state.columns[destination.droppableId];
    if (sourceCol.id === destinationCol.id) {
      const newColumn = reorderColumnList(
        sourceCol,
        source.index,
        destination.index
      );
      const newState = {
        ...state,
        columns: {
          ...state.columns,
          [newColumn.id]: newColumn,
        },
      };
      setState(newState);
      return;
    }
    // jika user drag and drop di berbeda colum
    const startTaskIds = Array.from(sourceCol.taskIds);
    const [removed] = startTaskIds.splice(source.index, 1);
    const newStartCol = {
      ...sourceCol,
      taskIds: startTaskIds,
    };

    const endTaskIds = Array.from(destinationCol.taskIds);
    endTaskIds.splice(destination.index, 0, removed);
    const newEndCol = {
      ...destinationCol,
      taskIds: endTaskIds,
    };
    const newState = {
      ...state,
      columns: {
        ...state.columns,
        [newStartCol.id]: newStartCol,
        [newEndCol.id]: newEndCol,
      },
    };
    setState(newState);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Head>
        <title>NEXT.js Kanbam</title>
      </Head>
      <Flex
        flexDir="column"
        bg="main-bg"
        minH="100vh"
        w="full"
        color="white-text"
        pb="2rem"
      >
        <Flex flexDir="column" py="4rem" align="center">
          <Heading fontSize="3xl" fontWeight="bold">
            Kanbam Application
          </Heading>
          <Text fontSize="20px" fontWeight={600} color="subtle-text">
            Kanbam Drag and Drop
          </Text>
        </Flex>
        <Flex justify="space-between" px="4rem">
          {state.columnOrder.map((id) => {
            const column = state.columns[id];
            const tasks = column.taskIds.map((id) => state.tasks[id]);

            return <Column key={column.id} column={column} tasks={tasks} />;
          })}
        </Flex>
      </Flex>
    </DragDropContext>
  );
}

const initialData = {
  tasks: {
    1: { id: 1, content: "Configute NEXT.js Application" },
    2: { id: 2, content: "Learn NEXT.js and TailwindCSS" },
    3: { id: 3, content: "Learn Node.js and Express JS" },
    4: { id: 4, content: "Creating Multi-Role Application" },
    5: { id: 5, content: "Learning React.js with JIRA" },
    6: { id: 6, content: "Make a MERN stack and Deploy!" },
  },
  columns: {
    "column-1": {
      id: "column-1",
      title: "TO-DO",
      taskIds: [1, 2, 3, 4, 5, 6],
    },
    "column-2": {
      id: "column-2",
      title: "IN-PROGRESS",
      taskIds: [],
    },
    "column-3": {
      id: "column-3",
      title: "COMPLETED",
      taskIds: [],
    },
  },
  columnOrder: ["column-1", "column-2", "column-3"],
};
