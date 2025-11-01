import { FeedInfoUI } from '@ui';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Example/FeedInfo',
  component: FeedInfoUI,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen'
  }
} satisfies Meta<typeof FeedInfoUI>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultFeedInfo: Story = {
  args: {
    feed: {
      total: 12,
      totalToday: 2
    },
    readyOrders: [123, 124, 125],
    pendingOrders: [126, 127]
  }
};

export const ManyOrders: Story = {
  args: {
    feed: {
      total: 999,
      totalToday: 99
    },
    readyOrders: Array.from({ length: 20 }, (_, i) => 1000 + i),
    pendingOrders: Array.from({ length: 15 }, (_, i) => 2000 + i)
  }
};

export const FewOrders: Story = {
  args: {
    feed: {
      total: 5,
      totalToday: 1
    },
    readyOrders: [1001, 1002],
    pendingOrders: [1003]
  }
};
