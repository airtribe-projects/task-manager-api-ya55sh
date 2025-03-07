const taskData = require("../task.json");
exports.hello = (req, res, next) => {
  res.json("hello");
};

exports.getTasks = (req, res, next) => {
  try {
    let query = req.query;
    let level = req.params;
    let list = taskData.tasks;
    if ("completed" in query) {
      list = taskData.tasks.filter(
        (item) => item.completed.toString() == query.completed
      );
      return res.json(list);
    }
    if ("sort" in query) {
      list = list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    if (level) {
      list = list.filter((item) => item.priority == level.level);
    }

    res.json(list);
  } catch (error) {
    res.status(500).json({ message: "Unable to get task list" });
  }
};

exports.getTaskById = (req, res, next) => {
  try {
    let taskId = req.params.id;
    let taskInfo = taskData.tasks.find((item) => item.id == taskId);

    if (!taskInfo) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(taskInfo);
  } catch (error) {
    res.status(500).json({ message: "Unable to fetch task" });
  }
};

exports.createTask = (req, res, next) => {
  try {
    let id = taskData.tasks.length + 1;
    let { title, description, priority } = req.body;

    if (!title || !description || !priority) {
      return res
        .status(400)
        .json({ message: "Title, description and priority are required" });
    }

    if (title.length == 0 || description.length == 0) {
      return res
        .status(400)
        .json({ message: "Please provide proper title or description" });
    }

    let newTask = {
      id,
      title,
      description,
      priority,
      completed: false,
      createdAt: new Date(Date.now()),
    };

    taskData.tasks.push(newTask);
    res.status(201).json(newTask);
  } catch (e) {
    res.status(500).json({ message: "Cannot create the task" });
  }
};

exports.updateTask = (req, res, next) => {
  try {
    let id = req.params.id;
    let { title, description, completed, priority } = req.body;
    if (
      title == undefined ||
      description == undefined ||
      completed == undefined ||
      priority == undefined
    ) {
      return res.status(400).json({ message: "Missing field" });
    }

    if (title.length == 0 || description.length == 0) {
      return res
        .status(400)
        .json({ message: "Please provide proper title or description" });
    }

    if (typeof completed != "boolean") {
      return res
        .status(400)
        .json({ message: "'Completed' should be a boolean value" });
    }

    let index = taskData.tasks.findIndex((item) => item.id == id);
    if (index == -1) res.status(404).json({ message: "Task not found" });

    taskData.tasks[index] = {
      ...taskData.tasks[index],
      title,
      description,
      priority,
      completed,
      createdAt: new Date(Date.now()),
    };

    res.json({
      message: "Task updated successfully",
      task: taskData.tasks,
    });
  } catch (error) {
    res.status(500).json({ message: "Could not update the task" });
  }
};

exports.deleteTask = (req, res, next) => {
  try {
    let id = req.params.id;
    let updatedLength = taskData.tasks.filter((item) => item.id != id);

    if (taskData.tasks.length === updatedLength) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Task cannot be deleted" });
  }
};
