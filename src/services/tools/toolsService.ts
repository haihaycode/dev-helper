import toolsData from "@/data/tools/tools.json";
import toolsTypeData from "@/data/tools/type.json";

interface Tool {
  name: string;
  idtools: string;
  idtoolsType: string;
  image: string;
  bg: string;
  description: string;
  color: string;
}

interface ToolType {
  name: string;
  idtoolsType: string;
  image: string;
  bg: string;
  description: string;
}

export const getToolsByTypeId = (idtoolsType: string): Tool[] => {
  return toolsData.filter((tool: Tool) => tool.idtoolsType === idtoolsType);
};

export const getToolTypeById = (idtoolsType: string): ToolType | undefined => {
  return toolsTypeData.find(
    (type: ToolType) => type.idtoolsType === idtoolsType
  );
};

// Example usage
const toolsOfType1 = getToolsByTypeId("1");
console.log(toolsOfType1);

const toolType1 = getToolTypeById("1");
console.log(toolType1);