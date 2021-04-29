function resetLines() {
  lines.forEach(toDelete => {
    Composite.remove(world, toDelete.body, true)
  })
  lines = []
  lastCreatedBuffer = []
  deselectAll()
}

function resetBalls() {
  balls.forEach(toDelete => {
    Composite.remove(world, toDelete.body, true)
  })
  balls = [];
  lastCreatedBuffer = []
  deselectAll()
}

function resetConstraints() {
  world.constraints.forEach(toDelete => {
    if (toDelete.label !== "Mouse Constraint")
      Composite.remove(world, toDelete, true)
  })
  constr = []
  links = []
  slingshots = []
  lastCreatedBuffer = []
  deselectAll()
}

function resetSketch() {
  resetLines()
  resetBalls()
  resetConstraints()
}

function undou() {
  let item = lastCreatedBuffer.pop()
  if (item) {
    if (item.body && item.body.label === "line") {
      let index = extractSelectedIndex(item, "line")
      Composite.remove(world, item.body);
      lines.splice(index, 1)
    } else if (item.body && item.body.label === "Circle Body" || item.body && item.body.label === "Rectangle Body") {
      let index = extractSelectedIndex(item, "ball")
      Composite.remove(world, item.body);
      balls.splice(index, 1)
    } else if (item.label && item.label === "Constraint") {
      let indexConstr = extractSelectedIndex(item, "constr")
      let indexLinks = extractSelectedIndex(item, "links")
      Composite.remove(world, item);
      constr.splice(indexConstr, 1)
      links.splice(indexLinks, 1)
    }

  }

}

function undouGhost() {
  if (lines.length > 0) {
    let toDelete = lines[lines.length - 1];
    if (toDelete.index === "x") {
      lines.pop()
    }
  }
}

function removeSelection() {
  if (selection.length > 0) {
    selection.forEach(item => {
      if (item.body.label === "line") {
        World.remove(world, item.body)
        let index = extractSelectedIndex(item, "line")
        lines.splice(index, 1)
      } else if (item.body.label === "Rectangle Body" || item.body.label === "Circle Body") {
        World.remove(world, item.body)
        let index = extractSelectedIndex(item, "ball")
        balls.splice(index, 1)
      }

    })
    selection = []
  }
}

function extractSelectedIndex(item, type) {
  let i = 0;
  let j = 0;
  let k = 0;
  let l = 0;
  let m = 0;
  let ret;
  if (type === "line") {
    while (i < lines.length) {
      if (item.index === lines[i].index) {
        ret = i
      }
      i++;
    }
  } else if (type === "ball") {
    while (j < balls.length) {
      if (item.index === balls[j].index) {
        ret = j
      }
      j++;
    }
  } else if (type === "constr") {
    while (k < constr.length) {
      if (item.index === constr[k].index) {
        ret = k
      }
      k++;
    }
  } else if (type === "links") {
    while (l < links.length) {
      if (item.index === links[l].index) {
        ret = l
      }
      l++;
    }
  } else if (type === "slingshot") {
    while (m < slingshots.length) {
      if (item.index === slingshots[m].index) {
        ret = m
      }
      m++;
    }
    k = 0
    while (k < constr.length) {
      if (item.index === constr[k].index) {
        ret = k
      }
      k++;
    }
  }

  return ret;
}

function deselectAll() {
  selection = []
  let limit = lines.length > balls.length ? lines.length : balls.length
  for (let i = 0; i < limit; i++) {
    if (lines[i]) {
      lines[i].selected = false;
    }
    if (balls[i]) {
      balls[i].selected = false;
    }
  }
}
