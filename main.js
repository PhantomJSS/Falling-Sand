function make2DArray(cols, rows)
{
    var arr = new Array(cols);
    
    for (var i = 0; i < arr.length; i++)
    {
        arr[i] = new Array(rows);
        
        for (var j = 0; j < arr[i].length; j++)
        {
            arr[i][j] = 0;
        }
    }
    return arr;
}

var grid;
var w = 4;
var cols, rows;

var hueVal = 200;

function colBoundary(i)
{
    return i >= 0 && i <= cols-1;
}

function rowBoundary(j)
{
    return j >= 0 && j <= rows-1;
}

function setup()
{
    createCanvas(1000, 800);
    colorMode(HSB, 360, 255, 255);
    cols = width/w;
    rows = height/w;
    grid = make2DArray(cols, rows);
}

function mouseDragged()
{
    var mouseCol = floor(mouseX / w);
    var mouseRow = floor(mouseY / w);

    var matrix = 2;
    var extent = floor(matrix/2);

    for (var i = -extent; i <= extent; i++)
    {
        for (var j = -extent; j <= extent; j++)
        {
            if (random(1) < 0.50)
            {
                let col = mouseCol + i;
                let row = mouseRow + j;
                if (colBoundary(col) && rowBoundary(row))
                {
                    grid[col][row] = hueVal;
                }
            }
        }
    }
    hueVal += 0.5;
    if (hueVal > 360)
    {
        hueVal = 1;
    }
}

function draw()
{
    background(0);

    for (var i = 0; i < cols; i++)
    {
        for (var j = 0; j < rows; j++)
        {
            noStroke();
            if (grid[i][j] > 0)
            {
                fill(grid[i][j], 255, 255);
                var x = i * w;
                var y = j * w;
                square(x, y, w);
            }
        }
    }

    var nextGrid = make2DArray(cols, rows);
    for (var i = 0; i < cols; i++)
        {
            for (var j = 0; j < rows; j++)
            {
                var state = grid[i][j];
                if (state > 1)
                {
                    var below = grid[i][j+1];

                    var dir = random([-1, 1]);

                    var belowA, belowB

                    if (colBoundary(i + dir))
                    {
                        belowA = grid[i+dir][j+1];
                    }
                    if (colBoundary(i - dir))
                    {
                        belowB = grid[i-dir][j+1];
                    }

                    if (below === 0)
                    {
                        nextGrid[i][j+1] = state;
                    }
                    else if (belowA === 0)
                    {
                        nextGrid[i+dir][j+1] = state;
                    }
                    else if (belowB === 0)
                    {
                        nextGrid[i-dir][j+1] = state;
                    }
                    else
                    {
                        nextGrid[i][j] = state;
                    }
                }
            }
        }
        grid = nextGrid;
}

