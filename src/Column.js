import { Flex, Text } from "@chakra-ui/react";
import { Draggable, Droppable } from "react-beautiful-dnd";

const Column = ({ column, tasks }) => {
  return (
    <Flex rounded="3px" bg="column-bg" w="400px" h="620px" flexDir="column">
      <Flex
        align="center"
        h="60px"
        maxH="60px"
        bg="column-header-bg"
        rounded="3px 3px 0 0"
        px="1.5rem"
        mb="1.5rem"
      >
        <Text fontSize="17px" fontWeight="600" color="subtle-text">
          {column.title}
        </Text>
      </Flex>

      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <Flex
            px="1.5rem"
            flex={1}
            flexDir="column"
            ref={provided.innerRef}
            {...provided.droppableProps}
            bg={snapshot.isDraggingOver ? "column-bg" : "column-header-bg"}
            transition="all 0.4s"
          >
            {tasks.map((task, index) => (
              <Draggable key={task.id} draggableId={`${task.id}`} index={index}>
                {(provided, snapshot) => (
                  <Flex
                    mb="1rem"
                    height="55px"
                    bg="card-bg"
                    rounded="3px"
                    px="1.5rem"
                    alignItems="center"
                    outline="2px solid"
                    outlineColor={
                      snapshot.isDragging ? "card-border" : "transparent"
                    }
                    boxShadow={
                      snapshot.isDragging
                        ? "0 5px 10px rgba(0,0,0,,0.6)"
                        : "unset"
                    }
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <Text lineHeight="20px">{task.content}</Text>
                  </Flex>
                )}
              </Draggable>
            ))}
          </Flex>
        )}
      </Droppable>
    </Flex>
  );
};

export default Column;
