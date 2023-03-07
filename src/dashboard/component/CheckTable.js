import { Card, Table, theme, Typography } from "antd";
import { useState } from "react";
import MainMenus from "../../components/menu/MainMenus";

const CheckTable = (props) => {
  const { columnsDataCheck, tableDataCheck } = props;
  const [selectionType] = useState("checkbox");

  const { useToken } = theme;
  const { token } = useToken();

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User",
      // Column configuration not to be checked
      name: record.name,
    }),
  };
  return (
    <Card>
      <div className="revenue-container">
        <Typography.Title level={3}>Revenue by Product</Typography.Title>
        <MainMenus />
      </div>

      <Table
        rowKey={(record) => record.uid}
        rowSelection={{
          type: selectionType,
          ...rowSelection,
        }}
        columns={columnsDataCheck}
        dataSource={tableDataCheck}
        pagination={false}
        size="large"
        style={{ background: token.colorBgContainer }}
      ></Table>
    </Card>
  );
};

export default CheckTable;
