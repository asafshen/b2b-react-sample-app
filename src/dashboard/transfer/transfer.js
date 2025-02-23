import "./transfer.scss";
import { useUser, useSession, useDescope } from "@descope/react-sdk";
import React, { useState } from "react";
import { Box } from "@chakra-ui/react";
import { Descope } from "@descope/react-sdk";
import { Form, Input, Button, message } from "antd";

const Transfer = () => {
  const { user, isUserLoading } = useUser();
  const { sessionToken, isSessionLoading } = useSession();
  const [stepUp, setStepUp] = useState(false);
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  if (isUserLoading || isSessionLoading) {
    return <div>Loading...</div>;
  }

  const handleTransfer = async (values) => {
    setLoading(true);
    try {
      const response = await fetch("/api/transfer", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionToken}`,
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Transfer failed");
      }

      const data = await response.json();
      message.success("Transfer successful");
      console.log("Transfer response:", data);
      setDone(true);
    } catch (error) {
      console.error("Error during transfer:", error);
      message.error("Transfer failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="data-table-wrapper">
      <div
        style={{
          margin: "auto",
          maxWidth: "auto",
          borderRadius: "10px",
          overflow: "hidden",
          width: "100%",
        }}
      >
        <Box margin="auto" width="50%" minHeight="500px">
          {!stepUp && (
            <Descope
              flowId="step-up"
              onSuccess={(e) => {
                console.log("Step-up success =>", e);
                setStepUp(true);
              }}
              onError={(e) => console.log("Step-up error", e)}
            />
          )}
          {stepUp && !done && (
            <Form
              layout="vertical"
              onFinish={handleTransfer}
              style={{ marginTop: 20 }}
            >
              <Form.Item
                label="Amount"
                name="amount"
                rules={[{ required: true, message: "Please enter the transfer amount" }]}
              >
                <Input placeholder="Enter amount" type="number" />
              </Form.Item>
              <Form.Item
                label="Recipient"
                name="recipient"
                rules={[{ required: true, message: "Please enter the recipient account" }]}
              >
                <Input placeholder="Enter recipient account" />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading}>
                  Transfer Money
                </Button>
              </Form.Item>
            </Form>
          )}
          {done && <h2>Transfer successful</h2>}
        </Box>
      </div>
    </div>
  );
};

export default Transfer;
