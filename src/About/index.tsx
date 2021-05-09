import { FC, useState, useEffect, Key } from "react";
import { Tree, Input, Button, Row, Col } from "antd";
import Demo from "./About";
const { Search } = Input;

interface Item {
  key: Key;
  title: string;
  children?: Item[];
}

interface Node {
  key: Key;
  title: JSX.Element;
  children?: Node[];
}

const data = [
  {
    key: 1,
    title: "1-John Brown sr",
    children: [
      {
        key: 11,
        title: "11-John Scld",
      },
      {
        key: 12,
        title: "12-John Brown jr.",
        children: [
          {
            key: 121,
            title: "121-Jily Gold",
          },
          {
            key: 122,
            title: "122-Jim Brown",
            children: [
              {
                key: 1221,
                title: "1221-Lily Brown",
              },
              {
                key: 1222,
                title: "1221-Tom Flfs",
                children: [
                  {
                    key: 12221,
                    title: "12221-Jack Brown",
                  },
                  {
                    key: 12222,
                    title: "12222-Jim glod",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        key: 13,
        title: "13-Jim Green sr.",
        children: [
          {
            key: 131,
            title: "131-Jim Green",
            children: [
              {
                key: 1311,
                title: "1311-Jim Green jr.",
              },
              {
                key: 1312,
                title: "1312-Jack Green gs.",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    key: 2,
    title: "2-Joe Black",
  },
];

const About: FC = () => {
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
  const [autoExpandParent, setAutoExpandParent] = useState<boolean>(true);
  const [defaultExpandAll, setDefaultExpandAll] = useState<boolean>(true);
  const [treeData, setTreeData] = useState<(Node | Item)[]>([]);
  const [keyword, setKeyword] = useState<string>("");

  useEffect(() => {
    setTimeout(() => {
      setTreeData(data);
    }, 200);
  }, []);

  const dataList: Item[] = [];
  const generateList = (data: Item[]) => {
    for (let i = 0; i < data.length; i++) {
      const node = data[i];
      const { key, title } = node;
      dataList.push({ key, title });
      if (node.children) {
        generateList(node.children);
      }
    }
  };
  generateList(data);

  const onChange = (value: string) => {
    setKeyword(value);
  };

  const getParentKey = (key: Key, tree: Item[]): Key | undefined => {
    let parentKey;
    for (let i = 0; i < tree.length; i++) {
      const node = tree[i];
      if (node.children) {
        if (node.children.some((item) => item.key === key)) {
          parentKey = node.key;
        } else if (getParentKey(key, node.children)) {
          parentKey = getParentKey(key, node.children);
        }
      }
    }
    return parentKey;
  };

  const loop = (data: Item[]): Node[] =>
    data.map((item) => {
      const index = item.title.indexOf(keyword);
      const beforeStr = item.title.substr(0, index);
      const afterStr = item.title.substr(index + keyword.length);
      const title =
        index > -1 ? (
          <span>
            {beforeStr}
            <span style={{ color: "blue" }}>{keyword}</span>
            {afterStr}
          </span>
        ) : (
          <span>{item.title}</span>
        );
      if (item.children) {
        return { title, key: item.key, children: loop(item.children) };
      }

      return {
        title,
        key: item.key,
      };
    });

  const onSearch = () => {
    const allExpandKeys = dataList
      .map((item) => {
        if (item.title.indexOf(keyword) > -1) {
          return getParentKey(item.key, data);
        }
        return null;
      })
      .filter((e) => !!e);
    const tree = loop(data);
    setTreeData(tree);
    setExpandedKeys(allExpandKeys as Key[]);
    setAutoExpandParent(true);
  };

  const onExpand = (expandedKeys: React.Key[]) => {
    setAutoExpandParent(false);
    setExpandedKeys(expandedKeys);
  };

  const onSelect = (selectedKeys: Key[], info: any) => {
    console.log("selected", selectedKeys, info);
  };

  const onCheck = (checkedKeys: Key[], info: any) => {
    console.log("onCheck", checkedKeys, info);
  };

  const handle = () => {
    setDefaultExpandAll(false);
  };

  return (
    <div
      style={{
        padding: 30,
        border: "1px solid #ccc",
        width: 800,
        minHeight: 600,
      }}
    >
      <Row gutter={16}>
        <Col span={12}>
          <Button
            type="primary"
            size="small"
            onClick={handle}
            style={{ marginBottom: 8 }}
          >
            handle
          </Button>
          <Search
            style={{ marginBottom: 8 }}
            placeholder="Search"
            onChange={({ target: { value } }) => onChange(value)}
            onSearch={onSearch}
          />
          <Tree
            checkable
            onExpand={onExpand}
            onSelect={onSelect}
            onCheck={(checkedKeys, info) => onCheck(checkedKeys as Key[], info)}
            expandedKeys={expandedKeys}
            autoExpandParent={autoExpandParent}
            treeData={treeData}
            defaultExpandAll={defaultExpandAll}
          />
        </Col>
        <Col span={12}>
          <Demo></Demo>
        </Col>
      </Row>
    </div>
  );
};

export default About;
