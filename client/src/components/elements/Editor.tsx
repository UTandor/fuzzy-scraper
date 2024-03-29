import { Input } from "../ui/input";
import { Button } from "@/components/ui/button";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import { TrashIcon, PencilIcon } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Item {
  id: number;
  content: string;
}

const Editor = ({ site, changeSiteData }) => {
  const [findItem, setFindItem] = useState("");
  const [found, setFound] = useState(false);
  const [items, setItems] = useState<Item[]>([]);

  const addItem = (e: FormEvent) => {
    e.preventDefault();

    if (findItem) {
      setItems([...items, { id: items.length + 1, content: findItem }]);
      setFindItem("");
    }
  };
  const handleCheck = () => {
    const includedInSite = site.includes(findItem);
    if (includedInSite) {
      const newSite = site.replace(new RegExp(`(${findItem})`, 'g'), 'something $1');
      changeSiteData(newSite, findItem);
    }
    console.log("Included in site? ", includedInSite);
  };

  const deleteItem = (id: number) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  useEffect(() => {
    if (findItem) {
      handleCheck();
    }
  }, [findItem]);

  return (
    <div>
      <div className="flex flex-col overflow-auto">
        <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b px-6 ">
          <h1 className="font-semibold text-lg md:text-2xl">Editor</h1>
        </header>
        <main className="flex flex-1 flex-col p-4 md:gap-8 md:p-6">
          <form
            onSubmit={(e) => addItem(e)}
            className="flex items-center mb-4 space-x-8 justify-between"
          >
            <Input
              className="w-full max-w-sm"
              placeholder="Find text..."
              type="text"
              value={findItem}
              onChange={(e) => setFindItem(e.target.value)}
            />
            <div className="flex flex-row space-x-4">
              <Button className="ml-auto" size="sm" type="submit">
                Add to List
              </Button>
            </div>
          </form>
          <div className="border shadow-sm rounded-lg">
            <Table>
              <ScrollArea className="max-h-[71.5vh] min-h-[15vh] flex flex-col gap-y-4 overflow-y-auto">
                <TableHeader className="sticky z-5 top-0 bg-white ">
                  <TableRow className=" border-b border ">
                    <TableHead className="text-center">S.No</TableHead>
                    <TableHead className="text-center">Content</TableHead>
                    <TableHead className=" text-center">Modify</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {items &&
                    items.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="text-center">
                          <p className="text-gray-500">{item.id}</p>
                        </TableCell>
                        <TableCell>
                          <h1 className="text-center">{item.content}</h1>
                        </TableCell>
                        <TableCell className="flex mx-auto w-  items-center justify-center">
                          <Button
                            className="rounded-full border border-gray-200 w-8 h-8"
                            size="icon"
                            variant="ghost"
                          >
                            <PencilIcon className="h-4 w-4" />
                          </Button>
                          <Button
                            className="rounded-full border border-gray-200 w-8 h-8"
                            size="icon"
                            variant="ghost"
                            onClick={() => deleteItem(item.id)}
                          >
                            <TrashIcon className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </ScrollArea>
            </Table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Editor;
