addLayer("rpg", {
    name: "rpg", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "I", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#ff6f6f",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "power", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.4, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return true}
})

addLayer("diary", {
    name: "diary", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "UI", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#ff0000",
    requires: new Decimal("F6767676767"), // Can be a function that takes requirement increases into account
    resource: "lore", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return true}
})

function roll(x) {
    let recursion = 0
    let rng = 1/Math.random()
    while (rng > x) {
        rng = 1/Math.random()
        recursion = recursion + 1
    }
    return rng * (x**recursion)
}

function massroll(x,best) {
    let rngroll = roll(x)
    while (rngroll < best) {
        rngroll = roll(x)
    }
    return rngroll
}

function massroll2(x,best) {
    let newrngamt = massroll(x,best)
    player.rng.points = new Decimal(Math.max(player.rng.points,newrngamt))
    return newrngamt
}

addLayer("rng", {
    name: "rng", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "RNG", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 2, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#f4fb68",
    requires: new Decimal("F6767676767"), // Can be a function that takes requirement increases into account
    resource: "RNG", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return true},
    clickables: {
        11: {
            canClick() {return true},
            onClick() {
                return massroll2(65536,Math.min(toNumber(player.rng.points),1e9))
            },
            display() {return toNumber(player.rng.points)},
        }
    },
    milestones: {
        1: {
            requirementDescription: "1000000 RNG",
            effectDescription: "llama",
            done() { return player.rng.points.gte(10**6) }
        },
        2: {
            requirementDescription: "Insane Roll",
            effectDescription: "1e9 RNG, massrolling capped at this",
            done() { return player.rng.points.gte(10**9) }
        },
        3: {
            requirementDescription: "Insurmountable Roll",
            effectDescription: "1e10 RNG",
            done() { return player.rng.points.gte(10**10) }
        },
        4: {
            requirementDescription: "Inconceivable Roll",
            effectDescription: "1e11 RNG",
            done() { return player.rng.points.gte(10**11) }
        },
        5: {
            requirementDescription: "Infinite Roll",
            effectDescription: "1e12 RNG",
            done() { return player.rng.points.gte(10**12) }
        },
        6: {
            requirementDescription: "Indescalae Roll",
            effectDescription: "1e13 RNG",
            done() { return player.rng.points.gte(10**13) }
        },
        7: {
            requirementDescription: "In[%%CALL OF THE VOID%%] Roll",
            effectDescription: "1e14 RNG",
            done() { return player.rng.points.gte(10**14) }
        },
        8: {
            requirementDescription: "In[...EPILOGUE...] Roll",
            effectDescription: "1e15 RNG",
            done() { return player.rng.points.gte(10**15) }
        },
    }
})


