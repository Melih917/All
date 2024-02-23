using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KorenNaDurvo
{
    class Program
    {
        static Dictionary<int, Tree<int>> nodeByValue = new Dictionary<int, Tree<int>>();


        static Tree<int> GetTreeNodeByValue(int value)
        {
            if (!nodeByValue.ContainsKey(value))
            {
                nodeByValue[value] = new Tree<int>(value);
            }
            return nodeByValue[value];
        }

        public static void AddEdge(int parent, int child)
        {
            Tree<int> parentNote = GetTreeNodeByValue(parent);
            Tree<int> childNote = GetTreeNodeByValue(child);

            parentNote.Children.Add(childNote);
            childNote.Parent = parentNote;
        }

        public static void ReadTree()
        {
            int nodeCount = int.Parse(Console.ReadLine());
            for (int i = 1; i < nodeCount; i++)
            {
                string[] edge = Console.ReadLine().Split(' ');
                AddEdge(int.Parse(edge[0]), int.Parse(edge[1]));

            }
        }

        static void Main(string[] args)
        {
            ReadTree();

                Tree<int> root = nodeByValue.Values.FirstOrDefault(x => x.Parent == null);

            if (root != null)
            {
                Console.WriteLine($"Корен {root.Value}");
            }


            var leafNodes = nodeByValue.Values.Where(y => y.Children.Count == 0).Select(y => y.Value).OrderBy(y => y).ToList();

            Console.WriteLine($"Листа {string.Join(",", leafNodes)}");

            var internalNodes = nodeByValue.Values.Where(c => c.Children.Count > 0 && c.Parent != null).Select(c => c.Value).OrderBy(c => c).ToList();

            Console.WriteLine($"Междинни възли: {string.Join(", " , internalNodes)}");
            
        }
    }
}
