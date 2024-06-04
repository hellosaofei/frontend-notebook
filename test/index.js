// 订阅者，需要将向事件中心注册自己，这样才能接受特定类型的事件
// 再次明确订阅者要做的事
// 监听 / 订阅 指定的事件，然后执行特定的动作
// 我们在这里进行一下抽象，发现这里也有一个一对多的关系：一种事件：多个动作
class Subscriber {
  constructor(name, eventType) {
    this.name = name;
    this.eventType = eventType;
    this.callback = null;
  }

  // 设置回调函数
  setCallback(callback) {
    this.callback = callback;
  }

  // 当事件触发时调用
  notify(data) {
    if (this.callback) {
      this.callback(data);
      console.log(`${this.name} received event: ${this.eventType}`, data);
    }
  }
}

// 事件中心
// 存储所有订阅者
// 提供方法让发布者发布事件
class EventCenter {
  constructor() {
    // 保存所有的订阅者
    this.subscribers = {};
  }

  // 订阅事件
  subscribe(eventType, subscriber) {
    if (!this.subscribers[eventType]) {
      this.subscribers[eventType] = [];
    }
    this.subscribers[eventType].push(subscriber);
  }

  // 取消订阅
  unsubscribe(eventType, subscriber) {
    if (this.subscribers[eventType]) {
      this.subscribers[eventType] = this.subscribers[eventType].filter(
        (s) => s !== subscriber
      );
    }
  }

  // 向发布者提供的方法
  publish(eventType, data) {
    if (this.subscribers[eventType]) {
      this.subscribers[eventType].forEach((subscriber) => {
        subscriber.notify(data);
      });
    }
  }
}
// 发布者
// 再次明确发布者要做的事
// 触发 / 发布一种特定的时事件
class Publisher {
  constructor(eventCenter) {
    this.eventCenter = eventCenter;
  }
  sendType(eventType, data) {
    this.eventCenter.publish(eventType, data);
  }
}

// 创建事件中心
const eventCenter = new EventCenter();

// 订阅者 + 1
const subscriber1 = new Subscriber("Subscriber 1", "event-type-1");
subscriber1.setCallback((data) => console.log("Subscriber 1 callback:", data));
eventCenter.subscribe("event-type-1", subscriber1);

const subscriber2 = new Subscriber("Subscriber 2", "event-type-2");
subscriber2.setCallback((data) => console.log("Subscriber 2 callback:", data));
eventCenter.subscribe("event-type-2", subscriber2);

// 创建发布者并发布事件
const publisher = new Publisher(eventCenter);
publisher.sendEvent("event-type-1", { message: "Hello, event-type-1!" });
publisher.sendEvent("event-type-2", { message: "Hello, event-type-2!" });

// 如果你想要取消订阅，可以这样：
// eventCenter.unsubscribe('event-type-1', subscriber1);
