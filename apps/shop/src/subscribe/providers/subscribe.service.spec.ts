describe("SubscribeService", () => {
  it("should be receive all days", () => {
    let mockSubscribes = [
      {
        createdAt: new Date("2024-02-20"),
        days: 30,
      },
      {
        createdAt: new Date("2024-02-20"),
        days: 30,
      },
      {
        createdAt: new Date("2020-01-01"),
        days: 30,
      },
    ];

    function mockSubscribesChecker() {
      mockSubscribes = mockSubscribes.filter((subscribeItem) => {
        return subscribeItem.createdAt.getTime() + subscribeItem.days * 24 * 60 * 60 * 1000 > new Date().getTime();
      });
      if (mockSubscribes.length === 0) return 0;
      return mockSubscribes.reduce((prev, current) => prev + current.days, 0);
    }

    expect(mockSubscribesChecker()).toBe(60);
  });
});
