package hu.brbrt.transaction;

import com.google.common.collect.ImmutableList;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static org.springframework.web.bind.annotation.RequestMethod.*;

@RestController
@RequestMapping("api/transaction")
public class TransactionController {

    private final TransactionService transactionService;

    public TransactionController(TransactionService transactionService) {
        this.transactionService = transactionService;
    }

    @RequestMapping(method = GET, path = "/{id}")
    public Transaction get(@PathVariable("id") int id) {
        return transactionService.get(id);
    }

    @RequestMapping(method = GET, value = "/descriptions")
    public List<String> getDescriptions() {
        return transactionService.getDescriptions();
    }

    @RequestMapping(method = GET, value = "/skeleton")
    public Transaction getSkeleton() {
        return transactionService.getSkeleton();
    }

    @RequestMapping(method = POST)
    public int create(@RequestBody Transaction transaction) {
        return transactionService.create(transaction);
    }

    @RequestMapping(method = POST, value = "/batch")
    public List<Integer> createBatch(@RequestBody List<Transaction> transactions) {
        return transactionService.createBatch(transactions);
    }

    @RequestMapping(method = PUT, path = "/{id}")
    public void update(@RequestBody Transaction transaction) {
        transactionService.update(transaction);
    }

    @RequestMapping(method = DELETE, path = "/{id}")
    public void delete(@PathVariable("id") int id) {
        transactionService.delete(id);
    }

}
