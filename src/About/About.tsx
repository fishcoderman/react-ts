import { useState, useEffect, Key } from "react";
import { Tree, Input } from "antd";
const { Search } = Input;

interface Item {
  key: Key;
  title: string;
  children?: Item[];
}

interface Node {
  key: Key;
  title: JSX.Element | string;
  children?: Node[];
}

const list = [
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

const Demo = () => {
  const [keyword, setKeyword] = useState<string>("");
  const [expandedKeys, setExpandedKeys] = useState<Key[]>([]);
  const [autoExpandParent, setAutoExpandParent] = useState<boolean>(true);
  const [treeData, setTreeData] = useState<(Item | Node)[]>(list);

  const onSearch = () => {
    const tree = filterTreeData(list, (node) => {
      return node.title.indexOf(keyword) > -1;
    });
    const dataList = generateList(tree);
    const allExpandKeys = dataList
      .map((item) => {
        if (item.title.indexOf(keyword) > -1) {
          return getParentKey(item.key, tree);
        }
        return null;
      })
      .filter((e) => !!e);
    const t = loop(tree);
    setTreeData(t);
    setExpandedKeys(allExpandKeys as Key[]);
    setAutoExpandParent(true);
    console.log("tree", t);
  };

  const onChange = (value: string) => {
    setKeyword(value);
  };

  const onExpand = (expandedKeys: React.Key[]) => {
    setAutoExpandParent(false);
    setExpandedKeys(expandedKeys);
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

  const generateList = (data: Item[], empty: Item[] = []) => {
    for (let i = 0; i < data.length; i++) {
      const node = data[i];
      const { key, title } = node;
      empty.push({ key, title });
      if (node.children) {
        generateList(node.children, empty);
      }
    }
    return empty;
  };

  const filterTreeData = (
    nodes: Item[],
    queryFn: (node: Item) => Boolean
  ): Item[] => {
    let result = [];
    for (let i = 0; i < nodes.length; i++) {
      let node = nodes[i];
      if (queryFn(node)) {
        result.push(node);
      } else if (node.children) {
        let newChildren = filterTreeData(node.children, queryFn);
        if (newChildren.length) {
          let newChildren = filterTreeData(node.children, queryFn);
          if (newChildren.length) {
            node.children = newChildren;
            result.push(node);
          }
        }
      }
    }
    return result;
  };

  return (
    <div>
      <Search
        style={{ marginBottom: 8 }}
        placeholder="Search"
        onChange={({ target: { value } }) => onChange(value)}
        onSearch={onSearch}
      />
      <Tree
        treeData={treeData}
        expandedKeys={expandedKeys}
        autoExpandParent={autoExpandParent}
        onExpand={onExpand}
      />
    </div>
  );
};

export default Demo;
