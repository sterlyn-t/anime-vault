"use client";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import React from "react";

const WatchLaterButton = () => {
  return (
    <Button variant="secondary">
      <Plus className="w-4 h-4 mr-2" />
      Watch later
    </Button>
  );
};

export default WatchLaterButton;
